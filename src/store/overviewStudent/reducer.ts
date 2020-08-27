import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
  OverviewStudentState,
  OverviewStudentTypes,
} from './types';

const initialState: OverviewStudentState = {
  results: null,
};

export default (state = initialState, action: OverviewStudentTypes) => {
  switch (action.type) {
    case FETCH_RESULTS_FOR_STUDENT_MAIN:
      return { ...state, results: action.results };
    case REMOVE_RESULTS_FOR_STUDENT_MAIN:
      return initialState;

    default:
      return state;
  }
};
