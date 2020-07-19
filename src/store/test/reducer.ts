import { MC3questions } from '../../types/model';
import { FETCH_MC_QUESTIONS, REMOVE_MC_QUESTIONS, TestTypes } from './types';

const initialState: MC3questions = {
  mc3questions: null,
};

export default (state = initialState, action: TestTypes) => {
  switch (action.type) {
    case FETCH_MC_QUESTIONS:
      return { ...state, mc3questions: action.mc3questions };

    case REMOVE_MC_QUESTIONS:
      return initialState;

    default:
      return state;
  }
};
