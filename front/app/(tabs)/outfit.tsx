import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const RowLayout = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          Alert.alert("Error", "User ID not found in AsyncStorage.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://10.0.2.2:8081/api/outfits?userId=${userId}`);
        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch outfits.");
        setLoading(false);
      }
    };

    fetchOutfits();
  }, []);

  const handleOutfitClick = (id: string) => {
    router.push({
      pathname: "/outfit-details", // Matches the dynamic route file
      params: { id }, // Provide the `id` parameter
    });
  };

  const handleAddNew = () => {
    // Push the CreateOutfit screen onto the stack
    router.push({ pathname: "/create-outfit" })
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.rowButton}
          onPress={() => handleOutfitClick(item.id)}
        >
          <Text style={styles.rowText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddNew}>
        <Text style={styles.addButtonText}>+ Add New</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 16,
  },
  rowButton: {
    backgroundColor: "#ddd",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  rowText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default RowLayout;
