import { DEFAULT_MESSAGE_TIMEOUT } from '../../constants/environment';
import { Dispatch } from 'redux';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  AppLoading,
  AppDoneLoading,
  ClearMessage,
  SetMessage,
} from './types';

export const appLoading = (): AppLoading => ({ type: APP_LOADING });

export const appDoneLoading = (): AppDoneLoading => ({
  type: APP_DONE_LOADING,
});

export const clearMessage = (): ClearMessage => ({ type: CLEAR_MESSAGE });

export const setMessage = (
  variant: 'success' | 'info' | 'warning' | 'error' | undefined,
  dismissable: boolean,
  text: string
): SetMessage => {
  return {
    type: SET_MESSAGE,
    payload: {
      variant,
      dismissable,
      text,
    },
  };
};

export const showMessageWithTimeout = (
  dispatch: Dispatch,
  variant: 'success' | 'info' | 'warning' | 'error' | undefined,
  dismissable: boolean,
  text: string,
  timeOutMilliSeconds: number
): void => {
  dispatch(setMessage(variant, dismissable, text));

  const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

  setTimeout(() => dispatch(clearMessage()), timeout);
};
