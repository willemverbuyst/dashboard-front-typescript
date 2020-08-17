// ACTIONS
export const APP_LOADING = 'APP_LOADING';
export const APP_DONE_LOADING = 'APP_DONE_LOADING';
export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export type StoreState = {
  appState: AppState;
};

export type GetState = () => StoreState;

export type AppLoading = {
  type: typeof APP_LOADING;
};

export type AppDoneLoading = {
  type: typeof APP_DONE_LOADING;
};

export type ClearMessage = {
  type: typeof CLEAR_MESSAGE;
};

export type SetMessage = {
  type: typeof SET_MESSAGE;
  payload: Message;
};

export type AppStateTypes =
  | AppLoading
  | AppDoneLoading
  | ClearMessage
  | SetMessage;

// REDUCER
export type AppState = {
  loading: boolean;
  message: Message | null;
};

export type Message = {
  variant: 'success' | 'info' | 'warning' | 'error' | undefined;
  dismissable: boolean;
  text: string;
};
