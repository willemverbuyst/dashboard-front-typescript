import { combineReducers } from 'redux';
import overviewStudent from './overviewStudent/reducer';
import questions from './questions/reducer';
import schoolInfo from './schoolInfo/reducer';
import student from './student/reducer';
import teacher from './teacher/reducer';
import subjectDetailsStudent from './subjectDetailsStudent/reducer';

export default combineReducers({
  overviewStudent,
  questions,
  schoolInfo,
  student,
  subjectDetailsStudent,
  teacher,
});
