import { ImageSource } from "expo-image";

export default interface Post {
  id: string;
  profileImage: ImageSource | null;
  authorName: string;
  image: ImageSource | null;
  description: string;
  likesCount: number;
  commentsCount: number;
}
