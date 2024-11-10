import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [originalAbout, setOriginalAbout] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("accessToken");

        const response = await fetch(`http://10.0.2.2:8080/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setDisplayName(data.displayName);
          setAbout(data.about || "");
          setOriginalAbout(data.about || "");
        } else {
          showAlert("Failed to load profile information.", "error");
        }
      } catch (error) {
        showAlert("Error fetching profile data.", "error");
      }
    };

    const fetchProfileImage = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('accessToken');
        const response = await fetch(`http://10.0.2.2:8080/api/users/${userId}/profile-image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileImage(`data:profileImage/jpeg;base64,${data.profileImage}`);
        }
      } catch (error) {
        console.log("Failed to load profile image:", error);
      }
    };

    fetchUserProfile();
    fetchProfileImage();
  }, []);

  const uploadProfileImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'profile.jpg',
      type: 'image/jpg',
    } as any);

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`http://10.0.2.2:8080/api/users/${userId}/profile-image`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        showAlert('Profile image updated successfully.', 'success');
      } else {
        showAlert('Failed to upload profile image.', 'error');
      }
    } catch (error) {
      showAlert('Error uploading profile image.', 'error');
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
      setProfileImage(uri);
      uploadProfileImage(uri);
    }
  };

  const handleUpdateAbout = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("accessToken");

      const response = await fetch(`http://10.0.2.2:8080/api/users/${userId}/about`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: about,
      });

      if (response.ok) {
        setOriginalAbout(about);
        showAlert("About section updated successfully.", "success");
      } else {
        showAlert("Failed to update about section.", "error");
      }
    } catch (error) {
      showAlert("Error updating about section.", "error");
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

  const isUpdateButtonDisabled = about === originalAbout;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle" size={80} color="#666" style={styles.icon} />
          )}
        </TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.displayName}>{displayName}</Text>
      </View>

      <View style={styles.aboutSection}>
        <TextInput
          style={styles.aboutInput}
          value={about}
          onChangeText={setAbout}
          placeholder="Write something about yourself"
          multiline />
        <TouchableOpacity
          style={[styles.updateButton, isUpdateButtonDisabled && styles.updateButtonDisabled]}
          onPress={handleUpdateAbout}
          disabled={isUpdateButtonDisabled}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>

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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  displayName: {
    fontSize: 16,
    color: "#666",
  },
  aboutSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  aboutInput: {
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
