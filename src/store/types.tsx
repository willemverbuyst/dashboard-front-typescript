import { AppState } from './appState/types';
import { OverviewStudentState } from './overviewStudent/types';
import { OverviewTeacherState } from './overviewTeacher/types';
import { QuestionsState } from './questions/types';
import { SchoolInfoState } from './schoolInfo/types';
import { StudentState } from './student/types';
import { SubjectDetailsStudentState } from './subjectDetailsStudent/types';
import { TeacherState } from './teacher/types';
import { TestState } from './test/types';

export type StoreState = {
  appState: AppState;
  overviewStudentState: OverviewStudentState;
  overviewTeacherState: OverviewTeacherState;
  questionsState: QuestionsState;
  schoolInfoState: SchoolInfoState;
  studentState: StudentState;
  subjectDetailsStudentState: SubjectDetailsStudentState;
  teacherState: TeacherState;
  testState: TestState;
};

export type GetState = () => StoreState;
