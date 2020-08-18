import {
  FETCH_RESULTS_FOR_SUBJECT,
  REMOVE_RESULTS_FOR_SUBJECT,
  SubjectDetailsStudent,
  StudentDetailsTypes,
} from './types';

const initialState: SubjectDetailsStudent = {
  all: null,
};

export default (state = initialState, action: StudentDetailsTypes) => {
  switch (action.type) {
    case FETCH_RESULTS_FOR_SUBJECT:
      return { ...state, all: action.subjectDetails };

    case REMOVE_RESULTS_FOR_SUBJECT:
      return initialState;

    default:
      return state;
  }
};
