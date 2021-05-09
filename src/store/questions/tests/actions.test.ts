import axios from 'axios';
import {
  questionsFetched,
  addQuestionToList,
  getQuestionsForSubject,
  createQuestion,
} from '../actions';
import { appLoading, appDoneLoading, setMessage } from '../../appState/actions';
import {
  FETCH_QUESTIONS,
  ADD_QUESTION,
  QuestionsFetched,
  AddQuestionToList,
  PostNewQuestion,
} from '../types';
import { IQuestion } from '../../../models/test.models';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#questionsState', () => {
  describe('#questionsFetched ', () => {
    const questions: IQuestion[] = [
      {
        text: 'test',
        answers: [
          {
            text: 'test_answer',
            correct: true,
          },
        ],
      },
    ];
    const expected: QuestionsFetched = {
      type: FETCH_QUESTIONS,
      payload: questions,
    };

    test('returns an action of type FETCH_QUESTIONS and questions', () => {
      expect(questionsFetched(questions)).toEqual(expected);
      expect(questionsFetched(questions).type).toEqual(FETCH_QUESTIONS);
      expect(questionsFetched(questions).payload).toEqual(questions);
    });
  });

  describe('#addQuestionToList ', () => {
    const question: IQuestion = {
      text: 'test',
      answers: [
        {
          text: 'test_answer',
          correct: true,
        },
      ],
    };
    const expected: AddQuestionToList = {
      type: ADD_QUESTION,
      payload: question,
    };

    test('returns an action of type FETCH_QUESTIONS and questions', () => {
      expect(addQuestionToList(question)).toEqual(expected);
      expect(addQuestionToList(question).type).toEqual(ADD_QUESTION);
      expect(addQuestionToList(question).payload).toEqual(question);
    });
  });
});

describe('#getQuestionsForSubject', () => {
  const questions = [
    {
      text: 'test',
      answers: [
        {
          text: 'test_answer',
          correct: true,
        },
      ],
    },
  ];
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: questions };

  test('calls axios and returns questions', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
    await getQuestionsForSubject(1)(dispatch, getState, extra);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(questionsFetched(questions));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#createQuestion', () => {
  const newQuestion: PostNewQuestion = {
    subject: 1,
    question: 'testQ',
    answer1: 'testA',
    answer2: 'testB',
    answer3: 'testC',
    answer4: 'testD',
  };
  const question: IQuestion = {
    text: 'testQ',
    answers: [
      {
        text: 'testA',
        correct: true,
      },
      {
        text: 'testB',
        correct: false,
      },
      {
        text: 'testC',
        correct: false,
      },
      {
        text: 'testD',
        correct: false,
      },
    ],
  };
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = null;
  const response = { data: { message: 'test' } };

  test('calls axios and returns questions', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));
    await createQuestion(newQuestion)(dispatch, getState, extra);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', true, response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(addQuestionToList(question));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});
