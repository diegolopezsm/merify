interface Window {
  electron: {
    initSlackAuth: () => void;
    invoke: (channel: string, ...args: any[]) => Promise<any>;
  };
}

declare global {
  interface Window {
    electron: {
      initSlackAuth: () => void;
      invoke: (channel: string, ...args: any[]) => Promise<any>;
    };
  }
}

export {};
