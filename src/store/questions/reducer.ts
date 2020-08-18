import {
  FETCH_QUESTIONS,
  ADD_QUESTION,
  Questions,
  QuestionActionTypes,
} from './types';

const initialState: Questions = {
  all: null,
};

export default (state = initialState, action: QuestionActionTypes) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, all: action.questions };

    case ADD_QUESTION:
      if (state.all) {
        return { ...state, all: [...state.all, action.question] };
      } else {
        return { ...state, all: action.question };
      }

    // case REMOVE_QUESTIONS:
    //   return initialState;

    default:
      return state;
  }
};
