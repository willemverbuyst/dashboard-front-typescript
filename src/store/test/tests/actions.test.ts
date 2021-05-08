import axios from 'axios';
import {
  IMultipleChoiceAnswer,
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
    const MCAnswer: IMultipleChoiceAnswer = {
      id: 1,
      text: 'test_answer',
      correct: true,
      questionId: 1,
    };
    const MCQuestion: IMultipleChoiceQuestion = {
      id: 1,
      text: 'test_question',
      subjectId: 1,
      answers: [MCAnswer],
    };
    const mcQuestions: IMultipleChoiceQuestion[] = [MCQuestion];
    const expected: MC3QuestionsFetched = {
      type: FETCH_MC_QUESTIONS,
      payload: mcQuestions,
    };

    test('returns an action w/ type FETCH_MC_QUESTIONS and questions as payload', () => {
      expect(questionsFetched(mcQuestions)).toEqual(expected);
      expect(questionsFetched(mcQuestions).type).toEqual(FETCH_MC_QUESTIONS);
      expect(questionsFetched(mcQuestions).payload).toEqual(mcQuestions);
      expect(questionsFetched(mcQuestions).payload.length).toBe(1);
    });
  });

  describe('#removeQuestions', () => {
    const expected: RemoveQuestions = {
      type: REMOVE_MC_QUESTIONS,
    };

    test('returns an action w/ type REMOVE_MC_QUESTIONS and no payload', () => {
      expect(removeQuestions()).toEqual(expected);
      expect(removeQuestions().type).toEqual(REMOVE_MC_QUESTIONS);
      expect(removeQuestions()).not.toHaveProperty('payload');
    });
  });
});

describe('#getMcQuestionsForTest', () => {
  const MCAnswer: IMultipleChoiceAnswer = {
    id: 1,
    text: 'test_answer',
    correct: true,
    questionId: 1,
  };
  const MCQuestion: IMultipleChoiceQuestion = {
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

  it('calls axios and returns questions', async () => {
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

  it('calls axios and returns a message', async () => {
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
