export type AppState = {
  loading: boolean;
  message: Message | null;
};

export type Message = {
  variant: 'success' | 'info' | 'warning' | 'error' | undefined;
  dismissable: boolean;
  text: string;
};
