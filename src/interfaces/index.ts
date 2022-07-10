export interface Choice {
  id: number;
  require: string[];
  text: string;
  items: string[];
  next: number;
}

export interface Feedback {
  title: string;
  message: string;
}

export interface PathNode {
  id: number;
  prompt: string;
  choices: Choice[];
}
