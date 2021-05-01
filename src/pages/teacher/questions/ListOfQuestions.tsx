import React, { ReactElement } from 'react';
import { Collapse } from 'antd';
import { IQuestion } from '../../../models/test.models';

const { Panel } = Collapse;

interface IProps {
  questions: IQuestion[];
}

const ListOfQuestions: React.FC<IProps> = ({
  questions,
}: IProps): ReactElement => {
  return (
    <Collapse style={{ width: 650 }}>
      {questions.map(({ text, answers }, i) => (
        <Panel header={text} key={i}>
          <ol>
            {answers.map(({ text, correct }, i) => (
              <li
                key={i}
                style={
                  !correct
                    ? { color: 'red' }
                    : { color: 'green', fontWeight: 'bold' }
                }
              >
                {text}
              </li>
            ))}
          </ol>
        </Panel>
      ))}
    </Collapse>
  );
};

export default ListOfQuestions;
