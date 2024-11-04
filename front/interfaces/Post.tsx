import { ImageSource } from "expo-image";

export default interface Post {
  id: string;
  // userProfileImage: any;
  author: string;
  imageUrl: ImageSource | null;
  description: string;
  likesCount: number;
  commentsCount: number;
}
