import { IMultipleChoiceQuestion } from '../../models/test.models';
import { StoreState } from '../types';

export const select3mcQuestionsForSubject = (
  state: StoreState
): IMultipleChoiceQuestion[] | null => state.testState.all;
