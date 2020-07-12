import { combineReducers } from 'redux';
import student from './student/reducer';
import teacher from './teacher/reducer';

export default combineReducers({
  student,
  teacher,
});
