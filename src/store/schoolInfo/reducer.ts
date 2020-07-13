import { Teachers } from '../../types/model';
import { FETCH_TEACHERS, teachersFetched } from './types';

const initialState: Teachers = {
  all: null,
};

export default (state = initialState, action: teachersFetched) => {
  switch (action.type) {
    case FETCH_TEACHERS:
      return { ...state, all: action.teachers };

    default:
      return state;
  }
};
