import axios from 'axios';
import {
  IMultipleChoiceQuestion,
  TestResult,
} from '../../../models/test.models';
import { appDoneLoading, appLoading, setMessage } from '../../appState/actions';
import {
  getMcQuestionsForTest,
  questionsFetched,
  removeQuestions,
  submitTest,
} from '../actions';
import {
  FETCH_MC_QUESTIONS,
  MC3QuestionsFetched,
  RemoveQuestions,
  REMOVE_MC_QUESTIONS,
} from '../types';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#testState', () => {
  describe('#questionsFetched w/ questions', () => {
    const MCAnswer = {
      id: 1,
      text: 'test_answer',
      correct: true,
      questionId: 1,
    };
    const MCQuestion = {
      id: 1,
      text: 'test_question',
      subjectId: 1,
      answers: [MCAnswer],
    };
    const mcQuestions: IMultipleChoiceQuestion[] = [MCQuestion];
    const expected: MC3QuestionsFetched = {
      type: FETCH_MC_QUESTIONS,
      mc3questions: mcQuestions,
    };

    test('returns an action w/ type FETCH_MC_QUESTIONS and questions as payload', () => {
      expect(questionsFetched(mcQuestions)).toEqual(expected);
      expect(questionsFetched(mcQuestions).mc3questions.length).toBe(1);
    });
  });
  describe('#removeQuestions', () => {
    const expected: RemoveQuestions = {
      type: REMOVE_MC_QUESTIONS,
    };
    test('returns an action w/ type REMOVE_MC_QUESTIONS and no payload', () => {
      expect(removeQuestions()).toEqual(expected);
      expect(removeQuestions().type).toBe(expected.type);
    });
  });
});

describe('#getMcQuestionsForTest', () => {
  it('calls axios and returns questions', async () => {
    const MCAnswer = {
      id: 1,
      text: 'test_answer',
      correct: true,
      questionId: 1,
    };
    const MCQuestion = {
      id: 1,
      text: 'test_question',
      subjectId: 1,
      answers: [MCAnswer],
    };
    const mcQuestions: IMultipleChoiceQuestion[] = [MCQuestion];

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = null;
    const response = { data: mcQuestions };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await getMcQuestionsForTest(1)(dispatch, getState, extra);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(removeQuestions());
    expect(dispatch).toHaveBeenCalledWith(questionsFetched(mcQuestions));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#submitTest', () => {
  it('calls axios and returns a message', async () => {
    const testResult: TestResult = {
      question1: 1,
      question2: 1,
      question3: 1,
      answer1: 1,
      answer2: 1,
      answer3: 1,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = null;
    const response = { data: { message: 'test' } };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));

    await submitTest(1, 1, testResult)(dispatch, getState, extra);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', true, response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
