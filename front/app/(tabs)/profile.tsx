import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import PostListUserView from '@/components/PostListUserView';
import Post from '@/interfaces/Post';

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [originalAbout, setOriginalAbout] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("accessToken");

        const response = await fetch(`http://10.0.2.2:8081/api/users/${userId}`, {
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
          setFollowers(data.followers || 0); // Assuming `followers` is in the response
          setFollowing(data.following || 0); // Assuming `following` is in the response
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
        const response = await fetch(`http://10.0.2.2:8081/api/users/${userId}/profile-image`, {
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
      const response = await fetch(`http://10.0.2.2:8081/api/users/${userId}/profile-image`, {
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

      const response = await fetch(`http://10.0.2.2:8081/api/users/${userId}/about`, {
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

  const fetchPosts = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error("Authorization token or user ID is missing.");
      }

      const response = await fetch(`http://10.0.2.2:8081/api/posts/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }

      const data = await response.json();
      const mappedPosts: Post[] = await Promise.all(
        data.map(async (item: any) => {
          const profileImageResponse = await fetch(`http://10.0.2.2:8081/api/users/${item.author}/profile-image`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const imageData = await profileImageResponse.json();
          const profileImage = `data:image/jpeg;base64,${imageData.profileImage}`;

          const postImageResponse = await fetch(`http://10.0.2.2:8081/api/posts/${item.id}/image`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const postImageData = await postImageResponse.json();
          const postImage = `data:image/jpeg;base64,${postImageData.image}`;

          return {
            profileImage: profileImage || null,
            id: item.id,
            authorName: item.authorName,
            image: postImage || null,
            description: item.description,
            likesCount: item.likeCount,
            commentsCount: item.commentsCount,
          };
        })
      );

      setPosts(mappedPosts);
    } catch (error) {
      console.error(error);
      setAlertMessage('Error fetching posts. Please try again.');
      setTimeout(() => setAlertMessage(null), 3000);
    } finally { }
  };

  // Corrected modal opening and comment handling
  const handleCommentClick = async (postId: string) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error("Authorization token is missing.");
      }

      const response = await fetch(`http://10.0.2.2:8081/api/posts/${postId}/comments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments.");
      }

      const data = await response.json();
      const commentsWithDetails = await Promise.all(data.map(async (comment: any) => {
        // Fetch profile image
        const profileImageResponse = await fetch(`http://10.0.2.2:8081/api/users/${comment.userId}/profile-image`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const imageData = await profileImageResponse.json();
        const profileImage = `data:image/jpeg;base64,${imageData.profileImage}`;

        // Fetch username
        const usernameResponse = await fetch(`http://10.0.2.2:8081/api/users/${comment.userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const usernameData = await usernameResponse.json();
        const username = usernameData.username;

        return {
          ...comment,
          profileImage,
          username,
        };
      }));

      setComments(commentsWithDetails);
      setIsModalVisible(true);  // Open modal after loading comments
    } catch (error) {
      console.error(error);
      setAlertMessage('Error fetching comments. Please try again.');
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setComments([]);
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

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

      {/* Add the following and followers count */}
      <View style={styles.followerSection}>
        <Text style={styles.followerText}>{followers} Followers</Text>
        <Text>•</Text>
        <Text style={styles.followerText}>{following} Following</Text>
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

      <PostListUserView posts={posts} onComment={handleCommentClick}></PostListUserView>

      {/* Modal for comments */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comments</Text>
            <ScrollView style={{ maxHeight: '60%' }}>
              {comments.map((comment: any) => (
                <View key={comment.id} style={styles.comment}>
                  <View style={styles.commentHeader}>
                    <Image
                      source={{ uri: comment.profileImage }}
                      style={styles.commentProfileImage}
                    />
                    <View>
                      <Text style={styles.username}>{comment.username}</Text>
                      <Text style={styles.commentText}>{comment.content}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Close button */}
            <TouchableOpacity onPress={closeModal} style={[styles.closeButton, { backgroundColor: 'red' }]}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  followerSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  followerText: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 5,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',  // Ensure modal doesn't take full screen
    justifyContent: 'flex-start', // Keep content aligned at the top
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
    flex: 1,            // Allow comment text to take up remaining space
    flexWrap: 'wrap',   // Ensure text wraps
    overflow: 'hidden', // Prevent overflow
    textAlign: 'left',  // Align text to the left
    paddingRight: 5,    // Optional: gives a little space at the right side
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
