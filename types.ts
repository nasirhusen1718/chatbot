export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
  groundingUrls?: string[];
}

export interface QuickPrompt {
  label: string;
  prompt: string;
  icon: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export type ViewType = 'chat' | 'map' | 'events';

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'academic' | 'social' | 'sports' | 'career';
}

export interface CampusLocation {
  id: string;
  name: string;
  description: string;
  coordinates: { x: number; y: number }; // Percentage from top-left
  type: 'academic' | 'facility' | 'food';
}