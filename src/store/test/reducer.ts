import {
  FETCH_MC_QUESTIONS,
  REMOVE_MC_QUESTIONS,
  MCTest,
  TestTypes,
} from './types';

const initialState: MCTest = {
  all: null,
};

export default (state = initialState, action: TestTypes) => {
  switch (action.type) {
    case FETCH_MC_QUESTIONS:
      return { ...state, all: action.mc3questions };

    case REMOVE_MC_QUESTIONS:
      return initialState;

    default:
      return state;
  }
};
