import { create } from 'zustand';

export interface Sequence {
  id: string;
  type: 'video' | 'audio' | 'text' | 'image' | 'website';
  startFrame: number;
  endFrame: number;
  content: string;
  props?: Record<string, any>;
}

interface VideoState {
  currentTemplate: string | null;
  sequences: Sequence[];
  selectedSequence: string | null;
  videoSettings: {
    duration: number;
    fps: number;
    width: number;
    height: number;
    volume: number;
  };
  setTemplate: (template: string) => void;
  updateSettings: (settings: Partial<VideoState['videoSettings']>) => void;
  addSequence: (sequence: Omit<Sequence, 'id'>) => void;
  removeSequence: (id: string) => void;
  updateSequence: (id: string, updates: Partial<Sequence>) => void;
  setSelectedSequence: (id: string | null) => void;
  addWebsiteSequence: (url: string) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentTemplate: null,
  sequences: [],
  selectedSequence: null,
  videoSettings: {
    duration: 30,
    fps: 30,
    width: 1920,
    height: 1080,
    volume: 1,
  },
  setTemplate: (template) => set({ currentTemplate: template }),
  updateSettings: (settings) =>
    set((state) => ({
      videoSettings: { ...state.videoSettings, ...settings },
    })),
  addSequence: (sequence) =>
    set((state) => ({
      sequences: [
        ...state.sequences,
        { ...sequence, id: Math.random().toString(36).slice(2) },
      ],
    })),
  removeSequence: (id) =>
    set((state) => ({
      sequences: state.sequences.filter((s) => s.id !== id),
    })),
  updateSequence: (id, updates) =>
    set((state) => ({
      sequences: state.sequences.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),
  setSelectedSequence: (id) => set({ selectedSequence: id }),
  addWebsiteSequence: (url) =>
    set((state) => ({
      sequences: [
        ...state.sequences,
        {
          id: Math.random().toString(36).slice(2),
          type: 'website',
          startFrame: 0,
          endFrame: 150,
          content: url,
          props: {
            title: 'Website Showcase',
          },
        },
      ],
    })),
}));