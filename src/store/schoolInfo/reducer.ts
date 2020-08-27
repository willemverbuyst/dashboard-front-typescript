import { STORE_TEACHERS, SchoolInfoState, StoreTeachers } from './types';

const initialState: SchoolInfoState = {
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
