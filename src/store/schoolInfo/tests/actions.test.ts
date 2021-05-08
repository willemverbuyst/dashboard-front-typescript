import axios from 'axios';
import { fetchAllTeachers, storeTeachers } from '../actions';
import { appLoading, appDoneLoading } from '../../appState/actions';
import { StoreTeachers, STORE_TEACHERS, TeacherOption } from '../types';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#schoolInfoState', () => {
  describe('#storeTeachers', () => {
    const teachers: TeacherOption[] = [{ name: 'test', id: 1 }];
    const action: StoreTeachers = {
      type: STORE_TEACHERS,
      payload: teachers,
    };

    test('return an action w/ type LOG_OUT_STUDENT and no payload', () => {
      expect(storeTeachers(teachers)).toEqual(action);
      expect(storeTeachers(teachers).type).toEqual(STORE_TEACHERS);
      expect(storeTeachers(teachers).payload).toEqual(teachers);
    });
  });
});

describe('#teachersFetched', () => {
  const teachers: TeacherOption[] = [{ name: 'test', id: 1 }];
  const dispatch = jest.fn();
  const response = { data: teachers };

  it('calls axios and returns teachers', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await fetchAllTeachers(dispatch);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storeTeachers(teachers));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
