import reducer from '../reducer';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  AppLoading,
  AppDoneLoading,
  ClearMessage,
  SetMessage,
  AppState,
} from '../types';

describe('#appStateReducer', () => {
  describe('w/ initial state and SET_MESSAGE action', () => {
    const initialState: AppState = {
      loading: false,
      message: null,
    };
    const variant: 'success' | 'info' | 'warning' | 'error' | undefined =
      'success';
    const dismissable: boolean = true;
    const text: string = 'test_message';
    const action: SetMessage = {
      type: SET_MESSAGE,
      payload: { variant, dismissable, text },
    };
    const newState: AppState = reducer(initialState, action);

    test('returns a state', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState).toEqual({
        loading: false,
        message: action.payload,
      });
      expect(newState.message).toBe(action.payload);
      expect(newState.loading).toBe(false);
    });
  });

  describe('w/ initial state and CLEAR_MESSAGE action', () => {
    const initialState: AppState = {
      loading: false,
      message: null,
    };
    const action: ClearMessage = { type: CLEAR_MESSAGE };
    const newState: AppState = reducer(initialState, action);

    test('returns a new state with the message set to null', () => {
      expect(newState).toEqual(initialState);
      expect(newState.message).toBeNull();
      expect(newState.loading).toBe(false);
    });
  });

  describe('w/ initial state and APP_LOADING action', () => {
    const initialState: AppState = {
      loading: false,
      message: null,
    };
    const action: AppLoading = { type: APP_LOADING };
    const newState: AppState = reducer(initialState, action);

    test('returns a new state with loading set to true', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.loading).toBe(true);
    });
  });

  describe('w/ state and APP_DONE_LOADING action', () => {
    const initialState = {
      loading: false,
      message: null,
    };
    const action: AppDoneLoading = { type: APP_DONE_LOADING };
    const newState = reducer(initialState, action);

    test('returns a new state with loading set to false', () => {
      expect(newState).toEqual(initialState);
      expect(newState.loading).toBe(false);
    });
  });
});
