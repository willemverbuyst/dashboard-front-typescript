import { combineReducers } from 'redux';
import appState from './appState/reducer';
import overviewStudent from './overviewStudent/reducer';
import questions from './questions/reducer';
import schoolInfo from './schoolInfo/reducer';
import student from './student/reducer';
import teacher from './teacher/reducer';
import subjectDetailsStudent from './subjectDetailsStudent/reducer';
import test from './test/reducer';

export default combineReducers({
  appState,
  overviewStudent,
  questions,
  schoolInfo,
  student,
  subjectDetailsStudent,
  teacher,
  test,
});
