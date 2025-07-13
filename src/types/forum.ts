export interface ForumSection {
  title: string;
  description: string;
  topics: number;
  posts: number;
  lastPost: {
    title: string;
    author: string;
    time: string;
  };
  icon: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  createdAt: string;
  tags: string[];
  replies?: number;
  lastReply?: {
    author: string;
    time: string;
  };
}

export interface ForumReply {
  id: string;
  topicId: string;
  content: string;
  author: string;
  authorEmail: string;
  createdAt: string;
  likes: number;
}

export interface User {
  nickname: string;
  email: string;
}