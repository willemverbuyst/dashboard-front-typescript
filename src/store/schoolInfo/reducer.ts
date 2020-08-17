import { STORE_TEACHERS, StoreTeachers, TeacherOptions } from './types';

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
