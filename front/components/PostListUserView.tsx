import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PostCardUserView from './PostCardUserView';
import Post from '@/interfaces/Post';

interface PostListViewProps {
  posts: Post[];
  onComment: (postId: string) => void; // Callback for commenting on a post
}

export default function PostListView({ posts, onComment }: PostListViewProps) {
  const renderItem = ({ item }: { item: Post }) => (
    <PostCardUserView
      profileImage={item.profileImage}
      authorName={item.authorName}
      image={item.image}
      description={item.description}
      likesCount={item.likesCount}
      commentsCount={item.commentsCount}
      onComment={() => onComment(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingVertical: 10,
  },
});
