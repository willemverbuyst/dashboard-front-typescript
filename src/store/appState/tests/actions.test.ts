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

describe('#appState', () => {
  describe('#setMessage', () => {
    const variant = 'success';
    const dismissable = true;
    const text = 'test_text';
    const expected = {
      type: SET_MESSAGE,
      payload: { variant, dismissable, text },
    };

    test('returns an anction w/ type SET_MESSAGE and payload variant, dismissable and text', () => {
      expect(setMessage(variant, dismissable, text)).toEqual(expected);
      expect(setMessage(variant, dismissable, text).type).toEqual(SET_MESSAGE);
      expect(setMessage(variant, dismissable, text).payload).toEqual(
        expected.payload
      );
    });
  });

  describe('#clearMessage', () => {
    const expected = {
      type: CLEAR_MESSAGE,
    };
    test('returns an action w/ type CLEAR_MESSAGE and no payload', () => {
      expect(clearMessage()).toEqual(expected);
      expect(clearMessage().type).toBe(CLEAR_MESSAGE);
      expect(clearMessage()).not.toHaveProperty('payload');
    });
  });

  describe('#appLoading', () => {
    const expected = {
      type: APP_LOADING,
    };
    test('returns an action w/ type APP_LOADING and no payload', () => {
      expect(appLoading()).toEqual(expected);
      expect(appLoading().type).toEqual(APP_LOADING);
      expect(appLoading()).not.toHaveProperty('payload');
    });
  });

  describe('#appDoneLoading', () => {
    const expected = {
      type: APP_DONE_LOADING,
    };
    test('returns an action w/ type APP_DONE_LOADING and no payload', () => {
      expect(appDoneLoading()).toEqual(expected);
      expect(appDoneLoading().type).toEqual(APP_DONE_LOADING);
      expect(appDoneLoading()).not.toHaveProperty('payload');
    });
  });
});

describe('#showMessageWithTimeout', () => {
  test('dispatches an action setMessage', async () => {
    const variant = 'warning';
    const dismissable = true;
    const text = 'test_text';
    const timeOutMilliSeconds = 1000;
    const dispatch = jest.fn();
    showMessageWithTimeout(
      dispatch,
      variant,
      dismissable,
      text,
      timeOutMilliSeconds
    );
    expect(dispatch).toHaveBeenCalledWith(
      setMessage(variant, dismissable, text)
    );
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
