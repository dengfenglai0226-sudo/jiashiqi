export interface MaterialItem {
  name: string;
  spec: string;
  count: string;
  usage: string;
}

export interface Step {
  title: string;
  description: string;
}

export enum TabView {
  BOM = 'BOM',
  STEPS = 'STEPS',
  CHAT = 'CHAT'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
