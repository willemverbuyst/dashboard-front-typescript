import axios from 'axios';
import { fetchAllTeachers, storeTeachers } from '../actions';
import { appLoading, appDoneLoading } from '../../appState/actions';
import { STORE_TEACHERS } from '../types';

const mockAxios = axios as jest.Mocked<typeof axios>;

it('calls axios and returns teachers', async () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const teachers = [{ name: 'test', id: 3 }];
  const response = { data: teachers };

  mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

  await fetchAllTeachers(dispatch, getState());

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(appLoading());
  expect(dispatch).toHaveBeenCalledWith(storeTeachers(teachers));
  expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
  expect(dispatch).toHaveBeenCalledTimes(3);
});

describe('teachersFetched', () => {
  describe('if given an array of teachers', () => {
    test('should return an action array containing teacher objects', () => {
      const teachers = [
        { name: 'test1', id: 1 },
        { name: 'test2', id: 2 },
      ];
      const expected = {
        type: STORE_TEACHERS,
        teachers: [
          { name: 'test1', id: 1 },
          { name: 'test2', id: 2 },
        ],
      };
      expect(storeTeachers(teachers)).toEqual(expected);
    });
    test('the payload of what is returned should have the same length as the homepages array', () => {
      const teachers = [
        { name: 'test1', id: 1 },
        { name: 'test2', id: 2 },
      ];
      const action = storeTeachers(teachers);
      expect(action.teachers).toHaveLength(teachers.length);
    });
    test('the payload of whats returned should contain objects with the same value as the teachers array', () => {
      const teachers = [
        { name: 'test1', id: 1 },
        { name: 'test2', id: 2 },
      ];
      const action = storeTeachers(teachers);
      expect(action.teachers).toEqual(teachers);
    });
  });
});
