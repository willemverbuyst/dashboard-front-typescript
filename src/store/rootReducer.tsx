import { combineReducers } from 'redux';

import appState from './appState/reducer';
import overviewStudentState from './overviewStudent/reducer';
import overviewTeacherState from './overviewTeacher/reducer';
import questionsState from './questions/reducer';
import schoolInfoState from './schoolInfo/reducer';
import studentState from './student/reducer';
import teacherState from './teacher/reducer';
import subjectDetailsStudentState from './subjectDetailsStudent/reducer';
import testState from './test/reducer';

export default combineReducers({
  appState,
  overviewStudentState,
  overviewTeacherState,
  questionsState,
  schoolInfoState,
  studentState,
  subjectDetailsStudentState,
  teacherState,
  testState,
});
