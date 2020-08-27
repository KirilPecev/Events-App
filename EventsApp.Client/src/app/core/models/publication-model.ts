export interface Publication {
  id: number;
  type: string;
  description: string;
  imageUrl: string;
  likes: Int16Array;
  shares: Int16Array;
  userImgUrl: string;
  userId: string;
  creator: string;
  isLiked: boolean;
  sharedFrom: string;
  canDelete: boolean;
}
