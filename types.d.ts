interface Window {
  electron: {
    invoke: (channel: string, ...args: any[]) => Promise<any>;
    on: (channel: string, callback: (...args: unknown[]) => void) => void;
  };
}

declare global {
  interface Window {
    electron: {
      invoke: (channel: string, ...args: any[]) => Promise<any>;
      on: (channel: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

export {};
