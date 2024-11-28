import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image, type ImageSource } from 'expo-image';
import { router } from 'expo-router';

interface PostCardViewProps {
  profileImage: ImageSource | null; // URL or local path to the user's profile image
  author: string;
  authorName: string;
  image: ImageSource | null; // URL or local path to the post image
  description: string;
  likesCount: number;
  commentsCount: number;
  onLike: () => void; // Callback function for liking the post
  onComment: () => void; // Callback function for commenting on the post
}

export default function PostCardView(props: PostCardViewProps) {
  const handleProfileClick = async (userId: string) => {
    router.push(`/another-profile?userId=${userId}`);
  }

  return (
    <View style={styles.card}>
      {/* User Profile Section */}
      <TouchableOpacity
        key={props.author}
        onPress={() => handleProfileClick(props.author)}
      >
        <View style={styles.userInfo}>
          <Image source={props.profileImage} style={styles.profileImage} />
          <Text style={styles.author}>{props.authorName}</Text>
        </View>
      </TouchableOpacity>

      {/* Post Image Section */}
      <Image source={props.image} style={styles.imageUrl} />

      {/* Description and Actions Section */}
      <View style={styles.actions}>
        <Text style={styles.description}>{props.description}</Text>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={props.onLike}>
              <Ionicons name="thumbs-up" size={20} color="#000" />
              <Text style={styles.buttonText}> {props.likesCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.onComment}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#000" />
              <Text style={styles.buttonText}> {props.commentsCount}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // For Android shadow
    padding: 10,
  },
  userInfo: {
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
  author: {
    fontWeight: 'bold',
  },
  imageUrl: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    marginTop: 10,
  },
  description: {
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns buttons to the right
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5, // Add some space between the icon and the text
  },
});
