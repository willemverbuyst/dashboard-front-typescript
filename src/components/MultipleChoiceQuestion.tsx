import React, { ReactElement } from 'react';
import { Radio, Form, Row, Col } from 'antd';
import { MCquestionDisplay } from '../models/test.models';

const MultipleChoiceQuestion: React.FC<MCquestionDisplay> = ({
  text,
  answers,
  questionNumber,
  questionId,
  onChange,
}: MCquestionDisplay): ReactElement => {
  const generateOptions = (): ReactElement => {
    return (
      <>
        {answers.map(({ text, id }, i) => (
          <Radio
            key={i}
            style={{
              display: 'block',
              height: '30px',
              lineHeight: '30px',
            }}
            value={id}
          >
            {text}
          </Radio>
        ))}
      </>
    );
  };

  return (
    <>
      <Row>
        <Col>{text}</Col>
      </Row>
      <Row>
        <Col>
          <Form.Item>
            <Radio.Group
              onChange={(e) =>
                onChange(e.target.value, questionNumber, questionId)
              }
            >
              {generateOptions()}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default MultipleChoiceQuestion;
