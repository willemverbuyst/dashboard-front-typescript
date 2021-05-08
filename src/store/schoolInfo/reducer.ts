import { STORE_TEACHERS, SchoolInfoState, StoreTeachers } from './types';

const initialState: SchoolInfoState = {
  all: null,
};

export default (
  state = initialState,
  action: StoreTeachers
): SchoolInfoState => {
  switch (action.type) {
    case STORE_TEACHERS:
      return { ...state, all: action.payload };

    default:
      return state;
  }
};
