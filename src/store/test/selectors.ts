import { StoreState } from './types';

export const selectDetailsForSubject = (state: StoreState) => {
  return state.mc3questions;
};
