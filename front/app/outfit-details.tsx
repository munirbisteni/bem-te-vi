import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

const OutfitDetails = () => {
  const { id } = useLocalSearchParams();
  const [outfit, setOutfit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfitDetails = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8081/api/outfits/${id}`);
        const result = await response.json();
        setOutfit(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching outfit details:", error);
        Alert.alert("Error", "Failed to fetch outfit details.");
        setLoading(false);
      }
    };

    if (id) {
      fetchOutfitDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!outfit) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Outfit details not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{outfit.name}</Text>

      {/* Display the top image */}
      {outfit.top?.imageBase64 && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: `data:image/jpeg;base64,${outfit.top.imageBase64}` }} style={styles.image} />
        </View>
      )}

      {/* Display the bottom image */}
      {outfit.bottom?.imageBase64 && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: `data:image/jpeg;base64,${outfit.bottom.imageBase64}` }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  imageLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 8,
  },
});

export default OutfitDetails;
