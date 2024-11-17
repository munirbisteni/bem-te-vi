import { ImageSource } from "expo-image";

export default interface Post {
  id: string;
  profileImage: ImageSource | null;
  author: string;
  imageUrl: ImageSource | null;
  description: string;
  likesCount: number;
  commentsCount: number;
}
