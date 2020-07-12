import { Questions } from '../../types/model';
import { QuestionActionTypes, FETCH_QUESTIONS, ADD_QUESTION } from './types';

const initialState: Questions = {
  all: null,
};

export default (state = initialState, action: QuestionActionTypes) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, all: action.questions };

    case ADD_QUESTION:
      if (state.all) {
        return { ...state, all: [...state.all, action.addQuestion] };
      } else {
        return { ...state, all: action.addQuestion };
      }

    // case REMOVE_QUESTIONS:
    //   return initialState;

    default:
      return state;
  }
};
