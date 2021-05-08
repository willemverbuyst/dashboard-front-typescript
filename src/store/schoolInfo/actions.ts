import axios from 'axios';
import { apiUrl } from '../../constants/environment';
import { STORE_TEACHERS, StoreTeachers, TeacherOption } from './types';
import { appLoading, appDoneLoading, setMessage } from '../appState/actions';
import { Dispatch } from 'redux';

export const storeTeachers = (teachers: TeacherOption[]): StoreTeachers => {
  return {
    type: STORE_TEACHERS,
    teachers,
  };
};

export const fetchAllTeachers = async (dispatch: Dispatch): Promise<void> => {
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/general/teachers`, {});
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
