import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import { STORE_TEACHERS, GetState, StoreTeachers } from './types';
import { TeacherOption } from '../../types/school-info-model';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';

export const storeTeachers = (teachers: TeacherOption[]): StoreTeachers => {
  return {
    type: STORE_TEACHERS,
    teachers,
  };
};

export const fetchAllTeachers = async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/school/teachers`, {});
    const teachers = response.data;

    dispatch(storeTeachers(teachers));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage('error', true, error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage('error', true, error.message));
    }
    dispatch(appDoneLoading());
  }
};
