# Entrega final

## Apresentação do problema abordado

Queremos oferecer ideias de roupas baseadas na pessoa. Para simplificar o problema, decidimos nos concentrar na combinação das cores das roupas com a cor da pele da pessoa. Procuramos encontrar tuplas de cores (pele, superior, inferior) que combinem bem com base em fotos de modelos. Podemos assim sugerir paletas de cores (superior, inferior) com base no tom de pele.

## Dados usados

Usamos dois conjuntos de dados para fotos de modelos:

- [DeepFashion](https://github.com/yumingj/DeepFashion-MultiModal): Contém 44.096 fotos de modelos, muitas das quais duplicadas em diferentes ângulos. Precisamos apenas de fotos onde vemos o modelo como um todo (superior e inferior), por isso filtramos o conjunto de dados para manter apenas as fotos utilizáveis. Como as imagens são relativamente grandes (em torno de 1000x1000), redimensionamos as imagens para agilizar o tempo de processamento posterior.

Filtre o script com base nos nomes dos arquivos:

```python
import glob
import os

images_path = "images/original"
trash_path = "images/trash"

original_files = glob.glob(images_path + "/*.jpg")

# for each image id, if there is a full type, keep only the full type
# otherwise, keep front and additional types because they can be fullbodies
for file in original_files:
    filename = file.split("/")[-1]
    similars = glob.glob(images_path + "/*" + filename.split("_")[2]+"*")
    if len(similars) >= 2:
        has_full = any("_full" in sim for sim in similars)
        if has_full:
            for similar in similars:
                if "_full" in similar:
                    continue
                else:
                    os.replace(similar, trash_path + "/" + similar.split("/")[-1])
        else:
            for similar in similars:
                if "_front" in similar or "_additional" in similar:
                    continue
                else:
                    os.replace(similar, trash_path + "/" + similar.split("/")[-1])
```

Script de redimensionnement des images :

```python
import cv2
import glob

images_path = "images/original"
resized_path = "images/resized"

original_files = glob.glob(images_path + "/*")

# resize images by 50%
for file in original_files:
    img = cv2.imread(file)
    img_50 = cv2.resize(img, None, fx = 0.50, fy = 0.50)
    cv2.imwrite(resized_path + "/" + file.split("/")[-1], img_50)
```
- [Style du Monde](https://styledumonde.com/): 7.841 fotos compuseram nosso segundo conjunto de dados. Este site compartilha fotos de celebridades tiradas nas ruas ou em importantes eventos de moda. O interesse era explorar pessoas que pudessem usar roupas do dia a dia, mas que também fossem mais originais. Raspamos todas as fotos oferecidas de julho de 2008 a setembro de 2023 com o uso do _Scrapy_ e removemos aquelas que não puderam ser utilizadas (várias pessoas presentes, pessoa/rosto não visível, não uma foto de corpo inteiro...). As fotos foram redimensionadas para acelerar o tempo de processamento posterior.

Para o scraping, a ideia foi reunir todas as fotos do site por ano, percorrendo todas as páginas e armazenando-as em uma pasta. O script abaixo foi executado manualmente para cada ano.

Script de desmantelamento:

```python
import scrapy
import urllib.request

class modelsSpider(scrapy.Spider):
  name = "models"

  def start_requests(self):
    urls = [
      # "https://styledumonde.com/2008",
      # "https://styledumonde.com/2009",
      # "https://styledumonde.com/2010",
      "https://styledumonde.com/2011",
      # "... until 2023",
    ]
    # add the url of all the pages for the corresponding year
    for i in range (2, 4): # TODO: update the last index corresponding to the year
      urls.append("https://styledumonde.com/2011/page/"+str(i))
    for url in urls:
      yield scrapy.Request(url=url, callback=self.parse)

  def parse(self, response):
    delimiter = 'jpg'
    imgs = [img.attrib["src"] for img in response.css("img.attachment-original")]
    for img in imgs:
      urllib.request.urlretrieve(img, "scrapped_img/"+img.split("/")[-1].split(delimiter)[0]+delimiter)
```
Conjuntos de dados filtrados e redimensionados estão disponíveis [aqui](https://drive.google.com/drive/folders/1_du47YFJGXp0veHWjdE59SLThpPCwxqg?usp=drive_link).

Esses conjuntos de dados ainda apresentam vários preconceitos:

- Após a filtragem, temos 1.626 imagens de homens e 12.569 imagens de mulheres no conjunto de dados DeepFashion.
- No conjunto de dados Style du Monde, também está presente uma predominância de fotos de mulheres em comparação com homens, mas não separamos as fotos de acordo com o sexo, o que significa que este conjunto de dados não é utilizável para homens.
- As imagens vêm de uma fonte ocidental, portanto nem todas as populações e estilos estão representados.
- As imagens são de qualidade profissional com luz que permite ver as cores com clareza. Este não será necessariamente o caso das fotos tiradas pelos usuários, portanto o conjunto de dados não representa perfeitamente a realidade do nosso caso de uso.

Também usamos um modelo pré-treinado para detecção de pessoas e roupas: [Segformer](https://huggingface.co/mattmdjaga/segformer_b2_clothes). Este modelo nos permite distinguir a parte superior, inferior e a cor da pele de uma pessoa.
## Métodos utilizados e sua justificativa

### Detecção de cores de fotos

Para cada imagem, extraímos as cores dominantes das máscaras superior, inferior e de cor da pele. Para esta etapa, utilizamos o [modelo de segmentação pré-treinado](https://huggingface.co/mattmdjaga/segformer_b2_clothes). Existem 17 categorias de segmentação diferentes. Para os homens, estamos interessados ​​em 3 categorias: top, bottom e skin. Para as mulheres, estamos interessados ​​em 5 categorias: top, bottom, skin, saia e vestido (que pode ser considerado uma combinação de top e bottom). Não levamos em consideração imagens para as quais uma das categorias não esteja presente.

Para cada segmento, obtivemos uma máscara binária. Aplicamos esta máscara à imagem original para obter uma imagem apenas com o segmento que nos interessa e depois extraímos as cores dominantes de cada segmento. Houve dificuldade com a cor de fundo que poderia ser confundida com a cor dominante do segmento (cor preta). Para evitar isso, transformamos as imagens em RGBA e definimos o valor de opacidade do fundo como 0. Isto permite determinar a cor dominante de cada segmento sem levar em conta o fundo. Em seguida, usamos a biblioteca [extcolors](https://pypi.org/project/extcolors/) para extrair as cores dominantes de cada segmento.

![Texto alternativo](imagem.webp)
### Agrupamento de cores

O clustering é baseado na biblioteca scikit-learn com o método k-means. Fizemos esta escolha porque desde o início os resultados foram convincentes. Este algoritmo pareceu-nos o mais intuitivo, o que nos permite acelerar o desenvolvimento do projeto. Fazemos agrupamento em um domínio tridimensional para os 3 componentes usados ​​para definir uma cor.

Recorremos ao domínio de cores L\*a\*b\* para fazer o agrupamento. Percebemos que o domínio RGB não era a melhor solução para fazer nossos grupos de cores. Os clusters tendem a se formar em torno da diagonal do cubo que representa os componentes RGB. Então acabamos com clusters representando tons de cinza.

Resultados de cluster no domínio Lab:
![Texto alternativo](imagem-4.png)
![Texto alternativo](imagem-5.png)
![Texto alternativo](imagem-3.png)

### Matriz de ocorrência

A partir dos clusters de cores e tuplas (skin, top, bottom), construímos tantas matrizes de ocorrência quanto os clusters de cores da pele. Para cada agrupamento de cores de pele, construímos uma matriz de ocorrências por cor para determinar as combinações mais populares.

![Texto alternativo](imagem.png)

### Classificação do traje
Quando o usuário carrega uma foto de corpo inteiro, nosso aplicativo extrai as cores dominantes da pele, superior e inferior. Caso esta combinação de cores esteja presente nas matrizes de ocorrência, atribuímos uma pontuação ao look com base em sua popularidade, com limite mínimo de 70. Caso não haja essa combinação, avaliamos o look considerando a presença individual do top e cor inferior nas matrizes de ocorrência. Neste caso, a pontuação atribuída varia entre um limite máximo de 70.

## Avaliação de aspectos ambientais e sociais

A ferramenta que criamos tem um impacto ambiental e social tanto em termos de design como de utilização.

### Impacto do design

A nossa equipa é composta por 4 pessoas e realizámos todo o projeto nas nossas máquinas pessoais:

- 2x Dell -Tiger-Lake-de-11ª geração-fait-la-difference.501538.0.html), ou seja, uma potência de aproximadamente 4,74W
- 1x Huawei MateBook 13 com bateria de 41,7Wh e duração de [7h37](https://www.notebookcheck.biz/Critique-complete-de-l-ultraportable-Huawei-MateBook-13-i7-8565U- GeForce -MX150.401626.0.html#toc-7) ou uma potência de aproximadamente 5,47W
- 1x LG Gram 16Z90P com bateria de 80Wh e autonomia de [15h43](https://www.notebookcheck.biz/Test-du-LG-Gram-16-2021-1-200-grammes-excellente-autonomy- ecran -16-10.543654.0.html), ou seja, uma potência de aproximadamente 5,09W
Para a fase de detecção de cores em nossos conjuntos de dados, usamos o modelo [Segformer pré-treinado](https://huggingface.co/mattmdjaga/segformer_b2_clothes) na plataforma Google Colab com sua GPU T4. O tempo total para processar os dois conjuntos de dados foi de aproximadamente 11 horas. De acordo com a [documentação da NVIDIA](https://www.nvidia.com/content/dam/en-zz/Solutions/design-visualization/solutions/resources/documents1/Datasheet_NVIDIA_T4_Virtualization.pdf), sua GPU T4 tem uma potência de 70W . O processamento no Google Colab exige que a máquina que inicia o script permaneça ativa: DeepDashion foi processado em um XPS 13 por 6 horas e Style du Monde foi processado em um MateBook 13 por 5 horas. Podemos, portanto, estimar que o custo energético da fase de detecção de cor é de 0,82579 kWh (70\*11 + 4,74\*6 + 5,47\*5).

Ao estimar o nosso tempo de trabalho neste projeto em 18 horas (12 sessões de 1h30), obtemos um consumo de energia de 18\*4,74\*2 + 18\*5,47 + 18\*5,09 = 0,36072 kWh. O que leva a um total de 0,36072 + 0,82579 = 1,18651 kWh, ou 1,18651 \* [0,05](https://www.objectifco2.fr/docs/upload/52/R% C3%A9f%C3%A9ential%20des%20factors %20d%27%C3%A9missões%20-%202023.pdf) = 0,059 kgCO2eq.

Em relação ao agrupamento e geração de matrizes de ocorrências, utilizou-se a mesma configuração da fase de detecção de cores. O tempo total de processamento é da ordem de um minuto. Podemos, portanto, estimar que o custo energético desta fase é de alguns Wh.
Tendo o dever de realizar o projeto no local, optamos por deslocar-se em transportes públicos. De acordo com os números da ADEME, o bonde emite [0,004 kgCO2e/km](https://impactco2.fr/transport/tramway) e o ônibus com motor térmico emite [0,11 kgCO2e/km](https://impactco2.fr/transport/ busthermique) por pessoa na França. Nosso consumo de emissões de carbono em termos de transporte é de 5,3km \* 0,004 + 4,5km \* 0,004 \* 2 + 1,4km \* 0,11 = 0,2112 kgCO2eq, ou aproximadamente 5 kgCO2eq para todas as viagens de ida e volta ao longo das 12 sessões.

### Impacto do uso

O facto da nossa aplicação fazer sugestões relacionadas com o estilo de roupa tem consequências potenciais em termos de consumo excessivo de roupa e, portanto, consumo excessivo de recursos e energia. Existe também o risco de padronização dos estilos de roupa ditados pela IA, o que levanta questões sobre a diversidade e individualidade da expressão pessoal.
Também estamos cientes de que nossa aplicação diz respeito aos pontos sensíveis da cor da pele e do processamento de imagens pessoais. Como parte de nosso projeto, limitações técnicas e financeiras fizeram com que implantássemos nosso aplicativo em um servidor de terceiros (Streamlit) e hospedassemos os clusters gerados e matrizes de ocorrência em um repositório público do GitHub. Estamos cientes de que isso pode representar problemas de segurança e confidencialidade. Pensamos, portanto, em soluções para superar estes problemas:

- Desfoque a foto enviada pelo usuário para torná-la anônima
- Evite usar um servidor de terceiros para implantar nosso aplicativo
- Criptografar trocas entre o usuário e o servidor

## Bibliografia

-WANG Xinhui. _Rumo à compatibilidade de cores na moda usando aprendizado de máquina._ Acessado em 18 de janeiro de 2024. https://www.diva-portal.org/smash/get/diva2:1348501/FULLTEXT01.pdf

- XIE Enze, WANG Wenhai, YU Zhiding, ANANDKUMAR Anima, ALVAREZ José M., LUO Ping. _SegFormer: Design simples e eficiente para segmentação semântica com transformadores._ Acessado em 18 de janeiro de 2024. https://huggingface.co/mattmdjaga/segformer_b2_clothes

- JIANG Yuming, YANG Shuai, QIU Haonan, WU Wayne, LOY Chen Change, LIU Ziwei. _Text2Human: Geração de imagem humana controlável baseada em texto._ Acessado em 18 de janeiro de 2024. https://github.com/yumingj/DeepFashion-MultiModal

- Site oficial do Style du Monde. Acessado em 18 de janeiro de 2024. https://styledumonde.com/_Para a parte do impacto do design_

-ADEME. _Qual é a pegada de carbono das suas viagens? Com Impact CO₂ você conhecerá seu impacto no clima_ Acessado em 20 de janeiro de 2024. https://impactco2.fr/transport/

-Allen Ngo. _Análise do Dell XPS 13 9310 (i7-1165G7, FHD +): processador Tiger Lake de 11ª geração faz a diferença_ Acessado em 20 de janeiro de 2024. https://www.notebookcheck.biz/Test-du-Dell-XPS-13- 9310-i7 -1165G7-FHD-o-processador-Tiger-Lake-de-11ª geração-faz a diferença.501538.0.html

-Allen Ngo. _Revisão completa do ultraportátil Huawei MateBook 13 (i7-8565U, GeForce MX150)_ Acessado em 20 de janeiro de 2024. https://www.notebookcheck.biz/Complete-review-of-the-ultraportable-Huawei-MateBook-13- i7 -8565U-GeForce-MX150.401626.0.html#toc-7

-Stephanie Chamberlain. _Análise do LG Gram 16 (2021): 1.200 gramas, excelente duração da bateria, tela 16:10_ Acessado em 20 de janeiro de 2024. https://www.notebookcheck.biz/Test-du-LG-Gram-16-2021-1- 200 -gramas-excelente-tela-de-autonomia-16-10.543654.0.html

## Código fonte

O código-fonte está disponível no repositório GitHub do projeto: https://github.com/Nielk74/ia-clothes.

Para entender seu conteúdo, você deve consultar o arquivo README.md do repositório.