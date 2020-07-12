import { combineReducers } from 'redux';
import questions from './questions/reducer';
import student from './student/reducer';
import teacher from './teacher/reducer';

export default combineReducers({
  questions,
  student,
  teacher,
});
