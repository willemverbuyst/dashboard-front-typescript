import reducer from '../reducer';
import { SchoolInfoState, STORE_TEACHERS, TeacherOption } from '../types';

describe('#schoolinfoReducer', () => {
  describe('w/ initial state and STORE_TEACHERS action ', () => {
    const initialState: SchoolInfoState = {
      all: null,
    };
    const teachers: TeacherOption[] = [{ name: 'test', id: 1 }];
    const newState: SchoolInfoState = reducer(undefined, {
      type: STORE_TEACHERS,
      payload: teachers,
    });

    test('returns a state with teachers', () => {
      expect(newState).not.toEqual(initialState);
      expect(newState.all).not.toBeNull();
      expect(newState.all).toEqual(teachers);
    });
  });
});
