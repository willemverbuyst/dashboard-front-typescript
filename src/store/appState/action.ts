import { DEFAULT_MESSAGE_TIMEOUT } from '../../config/constants';
import { Dispatch } from 'redux';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  AppStateTypes,
} from './types';

export const appLoading = () => ({ type: APP_LOADING });
export const appDoneLoading = () => ({ type: APP_DONE_LOADING });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });

export const setMessage = (
  variant: string,
  dismissable: boolean,
  text: string
): AppStateTypes => {
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
  variant: string,
  dismissable: boolean,
  text: string,
  timeOutMilliSeconds: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(setMessage(variant, dismissable, text));

    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

    setTimeout(() => dispatch(clearMessage()), timeout);
  };
};
