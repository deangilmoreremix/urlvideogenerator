type ProgressCallback = (progress: number) => void;

export class ProgressTracker {
  private static instance: ProgressTracker;
  private listeners: Map<string, Set<ProgressCallback>> = new Map();

  private constructor() {}

  static getInstance(): ProgressTracker {
    if (!this.instance) {
      this.instance = new ProgressTracker();
    }
    return this.instance;
  }

  addListener(id: string, callback: ProgressCallback): void {
    if (!this.listeners.has(id)) {
      this.listeners.set(id, new Set());
    }
    this.listeners.get(id)?.add(callback);
  }

  removeListener(id: string, callback: ProgressCallback): void {
    this.listeners.get(id)?.delete(callback);
    if (this.listeners.get(id)?.size === 0) {
      this.listeners.delete(id);
    }
  }

  updateProgress(id: string, progress: number): void {
    this.listeners.get(id)?.forEach(callback => callback(progress));
  }

  clearListeners(id: string): void {
    this.listeners.delete(id);
  }
}