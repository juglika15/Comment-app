export interface Image {
  png: string;
  webp: string;
}

export interface User {
  image: Image;
  username: string;
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Array<Reply>;
}

export interface CurrentUser {
  image: Image;
  username: string;
}

export enum ActiveCommentType {
  Replying = 'replying',
  Editing = 'editing',
  Deleting = 'deleting',
}

export interface ActiveComment {
  type: ActiveCommentType;
  id: number;
  replyingTo: string;
  index: number;
}
