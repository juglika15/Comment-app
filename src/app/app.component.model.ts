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

export enum ActivityType {
  Reply = 'Reply',
  Edit = 'Edit',
  Delete = 'Delete',
}

export interface ActiveSection {
  type: ActivityType;
  id: number;
  replyingTo: string;
  index: number;
}

export enum ContentType {
  Reply = 'Reply',
  Commnet = 'Comment',
}

export interface AddReply {
  contentType: ContentType;
  reply: string;
  replyingTo: string;
  index: number;
  id?: number;
}

export interface DeleteContent {
  contentType: ContentType;
  index: number;
  id: number;
}

export enum ScoreChangeType {
  Minus = 'Minus',
  Plus = 'Plus',
}

export interface ScoreChange {
  contentType: ContentType;
  type: ScoreChangeType;
  index: number;
  id?: number;
}
