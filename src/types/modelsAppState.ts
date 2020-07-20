export type AppState = {
  loading: boolean;
  message: Message | null;
};

export type Message = {
  variant: string;
  dismissable: boolean;
  text: string;
};
