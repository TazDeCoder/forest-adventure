export interface Prompt {
  id: string | number;
  title: string;
  value: string;
}

export interface Feedback {
  title: string;
  message: string;
}

export interface PathNode {
  value: string | number;
  left: PathNode;
  right: PathNode;
}
