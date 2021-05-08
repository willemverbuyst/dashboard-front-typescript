import {
  FETCH_MC_QUESTIONS,
  REMOVE_MC_QUESTIONS,
  TestState,
  TestTypes,
} from './types';

const initialState: TestState = {
  all: null,
};

export default (state = initialState, action: TestTypes) => {
  switch (action.type) {
    case FETCH_MC_QUESTIONS:
      return { ...state, all: action.payload };

    case REMOVE_MC_QUESTIONS:
      return initialState;

    default:
      return state;
  }
};
