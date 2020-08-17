import {
  appLoading,
  appDoneLoading,
  clearMessage,
  setMessage,
  showMessageWithTimeout,
} from '../actions';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from '../types';

describe('appState', () => {
  describe('if given action set message with text, variant and dismissable', () => {
    const variant = 'success';
    const dismissable = true;
    const text = 'test_text';
    const expected = {
      type: SET_MESSAGE,
      payload: { variant, dismissable, text },
    };
    test('should return an object containing type SET_MESSAGE and payload variant, dismissable and text', () => {
      expect(setMessage(variant, dismissable, text)).toEqual(expected);
      expect(setMessage(variant, dismissable, text).payload).toEqual(
        expected.payload
      );
    });
  });
  describe('if given action clear message', () => {
    const expected = {
      type: CLEAR_MESSAGE,
    };
    test('should return an action object with type CLEAR_MESSAGE and no payload', () => {
      expect(clearMessage()).toEqual(expected);
      expect(clearMessage().type).toBe(CLEAR_MESSAGE);
    });
  });
  describe('if given action app loading', () => {
    const expected = {
      type: APP_LOADING,
    };
    test('should return an action type APP_LOADING', () => {
      expect(appLoading()).toEqual(expected);
      expect(appLoading().type).not.toBeUndefined();
    });
  });
  describe('if given action app done loading', () => {
    const expected = {
      type: APP_DONE_LOADING,
    };
    test('should return an action type APP_DONE_LOADING', () => {
      expect(appDoneLoading()).toEqual(expected);
      expect(appDoneLoading().type).toBe(expected.type);
    });
  });
});

describe('showMessageWithTimeout', () => {
  describe('when called', () => {
    test('should dispatch an action set message', async () => {
      const variant = 'warning';
      const dismissable = true;
      const text = 'test_text';
      const timeOutMilliSeconds = 1000;
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      showMessageWithTimeout(
        variant,
        dismissable,
        text,
        timeOutMilliSeconds
      )(dispatch);
      expect(dispatch).toHaveBeenCalledWith(
        setMessage(variant, dismissable, text)
      );
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
