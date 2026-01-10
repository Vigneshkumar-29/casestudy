export interface Visual {
  id: string;
  type: 'image' | 'flowchart';
  data: string; // Base64 string for images, Mermaid code for flowcharts
}

export interface Section {
  id: string;
  title: string;
  content: string;
  isAiGenerated?: boolean;
  visuals?: Visual[];
}

export interface Project {
  id: string;
  title: string;
  type: 'Case Study' | 'Report' | 'Thesis' | 'Proposal';
  lastEdited: string;
  status: 'Draft' | 'Review' | 'Complete';
  content: Section[];
}

export interface Source {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: Source[];
  timestamp: Date;
}

export interface UserState {
  hasApiKey: boolean;
}