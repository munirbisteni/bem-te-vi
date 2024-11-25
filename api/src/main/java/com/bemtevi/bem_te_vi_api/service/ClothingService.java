package com.bemtevi.bem_te_vi_api.service;

import com.bemtevi.bem_te_vi_api.dto.ClothingDTO;
import com.bemtevi.bem_te_vi_api.dto.ClothingRequest;
import com.bemtevi.bem_te_vi_api.model.AccessoryType;
import com.bemtevi.bem_te_vi_api.model.Clothing;
import com.bemtevi.bem_te_vi_api.repository.ClothingRepository;
import com.bemtevi.bem_te_vi_api.utils.ClothingMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

import java.util.Base64;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClothingService {

    private final ClothingRepository clothingRepository;

    public List<ClothingDTO> findAllByUserId(String userId) {
        return clothingRepository.findByUserId(userId)
                .stream()
                .map(ClothingMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClothingDTO findById(String id) throws ChangeSetPersister.NotFoundException {
        return clothingRepository.findById(id)
                .map(ClothingMapper::toDTO)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    public void addClothing(ClothingRequest clothingRequest) {
        byte[] imageBytes = Base64.getDecoder().decode(clothingRequest.getImageBase64());
        Clothing clothing = ClothingMapper.toEntity(clothingRequest, imageBytes);
        clothingRepository.save(clothing);
    }
    private static final String IDENTIFY_CLOTHES_URL = "http://127.0.0.1:3333/identifyClothes";
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void createClothesByImage(String userId, String imageBase64) {
        try {
            // Chamar a API identifyClothes
            Map<String, Object> identifyResult = identifyClothes(imageBase64);

            // Verificar o tipo de retorno e processar
            Object tagsOrSingleEntry = identifyResult.get("tags");

            if (tagsOrSingleEntry instanceof List) {
                List<Map<String, String>> tagsList = (List<Map<String, String>>) tagsOrSingleEntry;
                for (Map<String, String> tagEntry : tagsList) {
                    processClothingEntry(tagEntry, userId);
                }
            } else if (tagsOrSingleEntry instanceof Map) {
                @SuppressWarnings("unchecked")
                Map<String, String> singleEntry = (Map<String, String>) tagsOrSingleEntry;
                processClothingEntry(singleEntry, userId);
            } else {
                throw new IllegalArgumentException("Formato de retorno inesperado para 'tags': " + tagsOrSingleEntry);
            }

            System.out.println("Roupas adicionadas com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao criar roupas a partir da imagem.", e);
        }
    }

    private Map<String, Object> identifyClothes(String imageBase64) throws Exception {
        HttpRequest identifyRequest = HttpRequest.newBuilder()
                .uri(URI.create(IDENTIFY_CLOTHES_URL))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(
                        objectMapper.writeValueAsString(Map.of("image", imageBase64))))
                .build();

        HttpResponse<String> identifyResponse = httpClient.send(identifyRequest, HttpResponse.BodyHandlers.ofString());

        if (identifyResponse.statusCode() != 200) {
            throw new RuntimeException("Erro ao identificar roupas: " + identifyResponse.body());
        }

        return objectMapper.readValue(identifyResponse.body(), Map.class);
    }

    private void processClothingEntry(Map<String, String> entry, String userId) {
        String tag = entry.get("tag");
        String value = entry.get("value");

        if (tag == null || value == null) {
            System.out.println("Entrada inválida, ignorando: " + entry);
            return;
        }

        // Gerar um nome aleatório de 10 caracteres
        String randomName = generateRandomName();

        // Configurar a tag com base no nome retornado
        AccessoryType accessoryType = mapTagToAccessoryType(tag);

        // Criar o objeto ClothingRequest
        ClothingRequest clothingRequest = new ClothingRequest(randomName, accessoryType, userId, value);

        // Adicionar a roupa
        addClothing(clothingRequest);
    }
    private AccessoryType mapTagToAccessoryType(String tag) {
        if ("Upper-clothes".equalsIgnoreCase(tag)) {
            return AccessoryType.TOP;
        } else if ("Pants".equalsIgnoreCase(tag)) {
            return AccessoryType.BOTTOM;
        } else {
            return AccessoryType.UNKNOWN; // Define um tipo padrão, se necessário
        }
    }

    private String generateRandomName() {
        int length = 10;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder name = new StringBuilder();

        for (int i = 0; i < length; i++) {
            name.append(characters.charAt(random.nextInt(characters.length())));
        }

        return name.toString();
    }
}
