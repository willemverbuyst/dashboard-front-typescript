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

describe.only('#appState', () => {
  describe('#setMessage with text, variant and dismissable', () => {
    const variant = 'success';
    const dismissable = true;
    const text = 'test_text';
    const expected = {
      type: SET_MESSAGE,
      payload: { variant, dismissable, text },
    };

    test('returns an anction w/ type SET_MESSAGE and payload variant, dismissable and text', () => {
      expect(setMessage(variant, dismissable, text)).toEqual(expected);
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
    });
  });

  describe('#appLoading', () => {
    const expected = {
      type: APP_LOADING,
    };
    test('returns an action w/ type APP_LOADING', () => {
      expect(appLoading()).toEqual(expected);
      expect(appLoading().type).not.toBeUndefined();
    });
  });

  describe('#appDoneLoading', () => {
    const expected = {
      type: APP_DONE_LOADING,
    };
    test('returns an action w/ type APP_DONE_LOADING', () => {
      expect(appDoneLoading()).toEqual(expected);
      expect(appDoneLoading().type).toBe(expected.type);
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
