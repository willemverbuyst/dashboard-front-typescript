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
} from '../types';

describe('userReducer', () => {
  const initialState = {
    loading: false,
    message: null,
  };
  describe('if given no state and a random action', () => {
    test('returns the inital state', () => {
      const newState = reducer(undefined, { type: APP_DONE_LOADING });
      expect(newState).toEqual(initialState);
    });
    test('returns the inital state', () => {
      const newState = reducer(undefined, { type: APP_LOADING });
      expect(newState.loading).toBe(true);
      expect(newState.message).toBeNull;
    });
  });
  describe('when given a SET_MESSAGE action type', () => {
    test('returns a new state with the payload containing correct values', () => {
      const variant = 'success';
      const dismissable = true;
      const text = 'test_message';
      const action: SetMessage = {
        type: SET_MESSAGE,
        payload: { variant, dismissable, text },
      };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({
        loading: false,
        message: action.payload,
      });
      expect(newState.message).toBe(action.payload);
      expect(newState.loading).toBe(false);
    });
  });
  describe('when given a CLEAR_MESSAGE action type', () => {
    test('returns a new state with the message set to null', () => {
      const action: ClearMessage = { type: CLEAR_MESSAGE };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ loading: false, message: null });
      expect(newState.message).toBeNull;
      expect(newState.loading).toBe(false);
    });
  });
  describe('when given APP_LOADING action type', () => {
    test('returns a new state with loading set to true', () => {
      const action: AppLoading = { type: APP_LOADING };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ loading: true, message: null });
      expect(newState.loading).toBe(true);
    });
  });
  describe('when given APP_DONE_LOADING action type', () => {
    test('returns a new state with loading set to false', () => {
      const action: AppDoneLoading = { type: APP_DONE_LOADING };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ loading: false, message: null });
      expect(newState.loading).toBe(false);
    });
  });
});
