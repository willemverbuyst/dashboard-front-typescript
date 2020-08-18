import { STORE_TEACHERS, TeacherOptions, StoreTeachers } from './types';

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
