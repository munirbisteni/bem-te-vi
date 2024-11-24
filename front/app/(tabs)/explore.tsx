import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Modal, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostListView from '@/components/PostListView';
import Post from '@/interfaces/Post';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState<string>('');  // New state to hold the comment text

  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error("Authorization token or user ID is missing.");
      }

      const response = await fetch(`http://10.0.2.2:8081/api/posts`, {
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
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error("Authorization token or user ID is missing.");
      }

      const likeResponse = await fetch(`http://10.0.2.2:8081/api/posts/${postId}/like/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!likeResponse.ok) {
        throw new Error("Failed to like the post.");
      }

      const likesResponse = await fetch(`http://10.0.2.2:8081/api/posts/${postId}/likes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!likesResponse.ok) {
        throw new Error("Failed to fetch updated like count.");
      }

      const updatedLikesCount = await likesResponse.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likesCount: updatedLikesCount } : post
        )
      );
    } catch (error) {
      console.error(error);
      setAlertMessage('Error liking the post. Please try again.');
      setTimeout(() => setAlertMessage(null), 3000);
    }
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
      setSelectedPostId(postId);
      setIsModalVisible(true);  // Open modal after loading comments
    } catch (error) {
      console.error(error);
      setAlertMessage('Error fetching comments. Please try again.');
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      setAlertMessage("Please enter a comment before submitting.");
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error("Authorization token or user ID is missing.");
      }

      // Step 1: Post the new comment
      const response = await fetch(`http://10.0.2.2:8081/api/posts/${selectedPostId}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          content: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      // Step 2: Fetch the updated comments with profile images and usernames
      const commentsResponse = await fetch(`http://10.0.2.2:8081/api/posts/${selectedPostId}/comments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!commentsResponse.ok) {
        throw new Error("Failed to fetch comments.");
      }

      const newComments = await commentsResponse.json();

      // Step 3: Fetch profile images and usernames for all comments
      const commentsWithDetails = await Promise.all(newComments.map(async (comment: any) => {
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

      // Step 4: Update the state with the new list of comments including profile images
      setComments(commentsWithDetails);
      setNewComment(''); // Clear the input field after submission

    } catch (error) {
      console.error(error);
      setAlertMessage('Error posting the comment. Please try again.');
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPostId(null);
    setComments([]);
    fetchPosts();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <PostListView posts={posts} onLike={handleLike} onComment={handleCommentClick} />
      )}
      {alertMessage && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}

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
                      style={styles.profileImage}
                    />
                    <View>
                      <Text style={styles.username}>{comment.username}</Text>
                      <Text style={styles.commentText}>{comment.content}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Input field for new comment */}
            <TextInput
              style={styles.input}
              placeholder="Write a comment..."
              multiline={true}
              numberOfLines={4}
              value={newComment}
              onChangeText={setNewComment}  // Update state with input text
            />

            {/* Comment button */}
            <TouchableOpacity onPress={handleSubmitComment} style={styles.commentButton}>
              <Text style={styles.commentButtonText}>Comment</Text>
            </TouchableOpacity>

            {/* Close button */}
            <TouchableOpacity onPress={closeModal} style={[styles.closeButton, { backgroundColor: 'red' }]}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  alertBox: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
    padding: 15,
    backgroundColor: '#F44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentButton: {
    marginTop: 10,
    backgroundColor: '#007BFF', // Adjust color as needed
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 80, // Adjust height as needed
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top', // Align text to the top for multiline input
  },
});
