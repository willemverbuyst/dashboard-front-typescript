import axios from 'axios';
import { apiUrl } from '../../config/constants';
import { Dispatch } from 'redux';
import { FETCH_TEACHERS, GetState } from './types';
import { Teachers } from '../../types/model';

export function teacherssFetched(teachers: Teachers) {
  return {
    type: FETCH_TEACHERS,
    teachers,
  };
}

export async function fetchAllTeachers(dispatch: Dispatch, getState: GetState) {
  try {
    const response = await axios.get(`${apiUrl}/school/teachers`, {});
    const teachers = response.data;

    dispatch(teacherssFetched(teachers));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
    } else {
      console.log(error.message);
    }
  }
}
