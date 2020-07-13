import { combineReducers } from 'redux';
import questions from './questions/reducer';
import schoolInfo from './schoolInfo/reducer';
import student from './student/reducer';
import teacher from './teacher/reducer';

export default combineReducers({
  questions,
  schoolInfo,
  student,
  teacher,
});
