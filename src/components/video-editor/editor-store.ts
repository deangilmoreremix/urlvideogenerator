import { create } from 'zustand';
import type { Sequence } from '../../store/video-store';

interface EditorState {
  currentTool: string;
  isPlaying: boolean;
  currentTime: number;
  zoom: number;
  selectedSequences: string[];
  clipboard: Sequence[];
  history: {
    past: Sequence[][];
    present: Sequence[];
    future: Sequence[][];
  };
  setCurrentTool: (tool: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setZoom: (zoom: number) => void;
  selectSequence: (id: string) => void;
  deselectSequence: (id: string) => void;
  copySelectedSequences: () => void;
  pasteSequences: () => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  currentTool: 'select',
  isPlaying: false,
  currentTime: 0,
  zoom: 1,
  selectedSequences: [],
  clipboard: [],
  history: {
    past: [],
    present: [],
    future: [],
  },
  setCurrentTool: (tool) => set({ currentTool: tool }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setZoom: (zoom) => set({ zoom }),
  selectSequence: (id) =>
    set((state) => ({
      selectedSequences: [...state.selectedSequences, id],
    })),
  deselectSequence: (id) =>
    set((state) => ({
      selectedSequences: state.selectedSequences.filter((s) => s !== id),
    })),
  copySelectedSequences: () => {
    // Implementation
  },
  pasteSequences: () => {
    // Implementation
  },
  undo: () => {
    // Implementation
  },
  redo: () => {
    // Implementation
  },
}));