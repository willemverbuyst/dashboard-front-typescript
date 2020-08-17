import { TeacherOptions } from '../../types/school-info-models';
import { STORE_TEACHERS, StoreTeachers } from './types';

const initialState: TeacherOptions = {
  all: null,
};

export default (state = initialState, action: StoreTeachers) => {
  switch (action.type) {
    case STORE_TEACHERS:
      return { ...state, all: action.teachers };

    default:
      return state;
  }
};
