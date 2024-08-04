import { StringIndexedObject } from 'src/models/common';
export interface User extends StringIndexedObject {
  userId?: number;
  name?: string;
  username?: string;
  avatar?: string;
  phone?: string;
  sex?: 0 | 1;
  email?: string;
  status?: 0 | 1;
  createTime?: string;
}

export interface ChatSession extends StringIndexedObject {
  sessionId?: number;
  createTime?: string;
  senderId?: number;
  receiverId?: number;
  messages?: ChatMessage[];
  star?: boolean;
  caption?: string;
}

export interface ChatMessage extends StringIndexedObject {
  messageId?: number;
  senderId?: number;
  receiverId?: number;
  sendTime?: string;
  loading?: boolean;
}

export interface Schedule extends StringIndexedObject {
  scheduleId?: number;
  title?: string;
  content?: string;
  startTime?: string;
  endTime?: string;
  star?: boolean;
  color?: string;
  url?: string;
  location?: string;
  notes?: string;
}
