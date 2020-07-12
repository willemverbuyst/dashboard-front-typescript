import { Questions } from '../../types/model';
import { QuestionActionTypes, FETCH_QUESTIONS } from './types';

const initialState: Questions = {
  all: null,
};

export default (state = initialState, action: QuestionActionTypes) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, all: action.questions };

    // case ADD_QUESTION:
    //   if (state.all) {
    //     return { ...state, all: [...state.all, action.payload] };
    //   } else {
    //     return { ...state, all: action.payload };
    //   }

    // case REMOVE_QUESTIONS:
    //   return initialState;

    default:
      return state;
  }
};
