from transformers import SegformerImageProcessor, AutoModelForSemanticSegmentation
import requests
import matplotlib.pyplot as plt
import torch.nn as nn
import torch
from PIL import ImageOps, ImageFilter, Image
import numpy as np
import os
import json
import base64
import io
from io import BytesIO
from flask import Flask
# Define o dicionário de labels
labels = {
    0: "Background", 1: "Hat", 2: "Hair", 3: "Sunglasses", 4: "Upper-clothes",
    5: "Skirt", 6: "Pants", 7: "Dress", 8: "Belt", 9: "Left-shoe",
    10: "Right-shoe", 11: "Face", 12: "Left-leg", 13: "Right-leg",
    14: "Left-arm", 15: "Right-arm", 16: "Bag", 17: "Scarf"
}


def load_image(image_input):
    # Tenta verificar se a entrada é uma URL
    if image_input.startswith("http://") or image_input.startswith("https://"):
        # Se for uma URL, faz o download da imagem
        image = Image.open(requests.get(image_input, stream=True).raw).convert("RGB")
    else:
        try:
            # Se não for uma URL, tenta tratar como Base64
            image_data = base64.b64decode(image_input)
            image = Image.open(BytesIO(image_data)).convert("RGB")
        except Exception as e:
            raise ValueError("A entrada não é uma URL válida nem uma string Base64 válida.") from e

    # Obtém as dimensões da imagem
    width, height = image.size
    return image, width, height

# Função para converter imagem em Base64
def image_to_base64(image):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

def segment_and_crop(image_uploaded, output_dir="output_segments"):
    # Carregar o processador e o modelo
    processor = SegformerImageProcessor.from_pretrained("mattmdjaga/segformer_b2_clothes")
    model = AutoModelForSemanticSegmentation.from_pretrained("mattmdjaga/segformer_b2_clothes")

    # Carregar a imagem
    image, width, height = load_image(image_uploaded)


    # Pré-processar a imagem
    inputs = processor(images=image, return_tensors="pt")

    # Executar o modelo
    outputs = model(**inputs)
    logits = outputs.logits

    # Obter a classe prevista para cada pixel
    predicted_classes = torch.argmax(logits, dim=1).squeeze(0)  # Remove batch dimension
    predicted_classes_np = predicted_classes.numpy()

    segments_base64 = {}


    # Iterar sobre cada classe (peça de roupa)
    for idx, label in labels.items():
        # Criar uma máscara binária para a classe atual
        mask = (predicted_classes_np == idx).astype(np.uint8)  # 1 onde pertence à classe, 0 caso contrário
        if mask.sum() == 0:  # Ignorar se a classe não estiver presente
            continue

        # Criar a imagem segmentada para a classe atual
        mask_image = Image.fromarray(mask * 255)  # Escalar para 0-255 (necessário para máscaras de recorte)
        
        mask_image = mask_image.resize(image.size, Image.Resampling.NEAREST)
        mask_image = mask_image.filter(ImageFilter.GaussianBlur(radius=3))  # Aplique um raio maior para um desfoque mais forte

        cropped_image = ImageOps.fit(image, mask_image.size)
        cropped_image.putalpha(mask_image)  # Adicionar a máscara como canal alfa

        base64_image = image_to_base64(cropped_image)
        if label in ("Upper-clothes", "Pants"):
            segments_base64[label] = base64_image
    print("Recortes concluídos!")
    return json.dumps(segments_base64, ensure_ascii=False)


# URL da imagem para teste
image_url = "https://img.freepik.com/fotos-premium/jovem-de-corpo-inteiro-na-pessoa-de-fundo-branco-apontando-a-mao-para-um-espaco-de-copia-de-camisa-orgulhoso-e-confiante_1187-33135.jpg?w=360"
# Executa o método
segment_and_crop(image_url)


