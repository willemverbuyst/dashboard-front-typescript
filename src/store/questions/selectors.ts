import { IQuestion } from '../../models/test.models';
import { StoreState } from '../types';

export const selectAllQuestionsForSubject = (
  state: StoreState
): IQuestion[] | null => state.questionsState.all;
