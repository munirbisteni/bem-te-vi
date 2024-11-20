import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostListView from '@/components/PostListView';
import Post from '@/interfaces/Post';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);

    try {
      // Retrieve accessToken and userId from AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error("Authorization token or user ID is missing.");
      }

      // Make the API request to fetch posts
      const response = await fetch(`http://10.0.2.2:8081/api/posts/user/${userId}/following`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }

      // Process the JSON response and map to Post interface
      const data = await response.json();
      const mappedPosts: Post[] = await Promise.all(
        data.map(async (item: any) => {
          const profileImageResponse = await fetch(`http://10.0.2.2:8081/api/users/${item.author}/profile-image`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const imageData = await profileImageResponse.json();
          const profileImage = `data:profileImage/jpeg;base64,${imageData.profileImage}`

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
          }
        }));

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
      // Retrieve accessToken and userId from AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error("Authorization token or user ID is missing.");
      }

      // Call the like endpoint
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

      // Call the likes count endpoint to get the updated like count
      const likesResponse = await fetch(`http://10.0.2.2:8081/api/posts/${postId}/likes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!likesResponse.ok) {
        throw new Error("Failed to fetch updated like count.");
      }

      // Update the post in the state with the new like count
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

  const handleComment = (postId: string) => {
    console.log("Comment clicked for post ID:", postId);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <PostListView posts={posts} onLike={handleLike} onComment={handleComment} />
      )}
      {alertMessage && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}
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
});
