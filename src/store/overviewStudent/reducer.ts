import { Results } from '../../types/model';

import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
  overviewStudentTypes,
} from './types';

const initialState: Results = {
  results: null,
};

export default (state = initialState, action: overviewStudentTypes) => {
  switch (action.type) {
    case FETCH_RESULTS_FOR_STUDENT_MAIN:
      return { ...state, results: action.results };
    // case REMOVE_RESULTS_FOR_STUDENT_MAIN:
    //   return initialState;

    default:
      return state;
  }
};
