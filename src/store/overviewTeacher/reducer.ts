import {
  FETCH_OVERVIEW_FOR_SUBJECT,
  FETCH_OVERVIEW_FOR_STUDENT,
  FETCH_OVERVIEW_FOR_MAIN,
  REMOVE_OVERVIEW,
  overviewTeacherTypes,
  OverviewTeacher,
} from './types';

const initialState: OverviewTeacher = {
  subjects: null,
  students: null,
  main: {
    scores: null,
    tests: null,
  },
};

export default (state = initialState, action: overviewTeacherTypes) => {
  switch (action.type) {
    case FETCH_OVERVIEW_FOR_SUBJECT:
      return { ...state, subjects: action.payload };

    case FETCH_OVERVIEW_FOR_STUDENT:
      return { ...state, students: action.payload };

    case FETCH_OVERVIEW_FOR_MAIN:
      return { ...state, main: action.payload };

    case REMOVE_OVERVIEW:
      return initialState;

    default:
      return state;
  }
};
