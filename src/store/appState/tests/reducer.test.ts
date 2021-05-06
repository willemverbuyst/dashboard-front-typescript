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

describe.only('#appStateReducer', () => {
  const initialState = {
    loading: false,
    message: null,
  };

  describe('when given a SET_MESSAGE action type', () => {
    const variant = 'success';
    const dismissable = true;
    const text = 'test_message';
    const action: SetMessage = {
      type: SET_MESSAGE,
      payload: { variant, dismissable, text },
    };
    const newState = reducer(initialState, action);

    test('returns a new state with the payload containing correct values', () => {
      expect(newState).toEqual({
        loading: false,
        message: action.payload,
      });
      expect(newState.message).toBe(action.payload);
      expect(newState.loading).toBe(false);
    });
  });

  describe('when given a CLEAR_MESSAGE action type', () => {
    const action: ClearMessage = { type: CLEAR_MESSAGE };
    const newState = reducer(initialState, action);

    test('returns a new state with the message set to null', () => {
      expect(newState).toEqual({ loading: false, message: null });
      expect(newState.message).toBeNull();
      expect(newState.loading).toBe(false);
    });
  });

  describe('when given APP_LOADING action type', () => {
    const action: AppLoading = { type: APP_LOADING };
    const newState = reducer(initialState, action);

    test('returns a new state with loading set to true', () => {
      expect(newState).toEqual({ loading: true, message: null });
      expect(newState.loading).toBe(true);
    });
  });

  describe('when given APP_DONE_LOADING action type', () => {
    const action: AppDoneLoading = { type: APP_DONE_LOADING };
    const newState = reducer(initialState, action);

    test('returns a new state with loading set to false', () => {
      expect(newState).toEqual({ loading: false, message: null });
      expect(newState.loading).toBe(false);
    });
  });
});
