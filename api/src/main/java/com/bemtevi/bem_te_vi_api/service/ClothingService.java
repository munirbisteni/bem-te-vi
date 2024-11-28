package com.bemtevi.bem_te_vi_api.service;

import com.bemtevi.bem_te_vi_api.dto.ClothingDTO;
import com.bemtevi.bem_te_vi_api.dto.ClothingRequest;
import com.bemtevi.bem_te_vi_api.model.AccessoryType;
import com.bemtevi.bem_te_vi_api.model.Clothing;
import com.bemtevi.bem_te_vi_api.repository.ClothingRepository;
import com.bemtevi.bem_te_vi_api.utils.ClothingMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.Console;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

import java.util.List;
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

    public void createClothesByImage(String userId, String imageBase64) {
        try {
            // Chamar a API identifyClothes
            Map<String, Object> identifyResult = identifyClothes(imageBase64);

            // Listas para armazenar as chaves e os valores
            List<String> keys = new ArrayList<>();
            List<Object> values = new ArrayList<>();

            // Itera pelo mapa para preencher as listas
            for (Map.Entry<String, Object> entry : identifyResult.entrySet()) {
                keys.add(entry.getKey());      // Adiciona a chave à lista de chaves
                values.add(entry.getValue()); // Adiciona o valor à lista de valores
            }


// Processa todos os elementos da lista uniformemente
            // Supondo que já temos as listas keys e values preenchidas
            for (int i = 0; i < keys.size(); i++) {
                String key = keys.get(i);       // Recupera a chave pelo índice
                String value = values.get(i).toString();   // Recupera o valor pelo mesmo índice

                processClothingEntry(key, value, userId);
            }

            System.out.println("Roupas adicionadas com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao criar roupas a partir da imagem.", e);
        }
    }

    private Map<String, Object> identifyClothes(String imageBase64) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

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
        System.out.println(identifyResponse.body().substring(0, 100));
        return objectMapper.readValue(
                identifyResponse.body(),
                new TypeReference<Map<String, Object>>() {}
        );
    }

    private void processClothingEntry(String tag, String value, String userId) {
        String randomName = generateRandomName();

        AccessoryType accessoryType = mapTagToAccessoryType(tag);
        ClothingRequest clothingRequest = new ClothingRequest(randomName, accessoryType, userId, value);
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
