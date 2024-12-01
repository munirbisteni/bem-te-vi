import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

export default function ProfileScreen() {
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const handlePostCreation = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: postImage,
      name: 'post.jpg',
      type: 'image/jpg',
    } as any);

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('accessToken');

      formData.append('description', description);
      const response = await fetch(`http://10.0.2.2:8081/api/posts/create/${userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, },
        body: formData,
      });

      if (response.ok) {
        showAlert('Post uploaded successfully.', 'success');
      } else {
        showAlert(`Failed to upload post. ${response.body}`, 'error');
      }
    } catch (error) {
      showAlert('Error uploading post.', 'error');
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPostImage(uri);
    }
  };

  const showAlert = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage}>
            {postImage ? (
              <Image source={{ uri: postImage }} style={styles.profileImage} />
            ) : (
              <Ionicons name="image" size={200} color="#666" style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.postSection}>
          <TextInput
            style={styles.postInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Write something to share"
            multiline />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handlePostCreation}>
            <Text style={styles.updateButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {alertMessage && (
        <View style={[
          styles.alertBox,
          { backgroundColor: alertType === "success" ? "#4CAF50" : "#F44336" }
        ]}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  profileImage: {
    width: 300,
    height: 600,
    borderRadius: 5,
  },
  postSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  postInput: {
    height: 80,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  updateButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  updateButtonDisabled: {
    backgroundColor: "#aaa",
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  alertBox: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
  alertText: {
    color: "#fff",
    textAlign: "center",
  },
});
