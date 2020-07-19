import React from 'react';
import { Radio, Form, Row, Col } from 'antd';
import { MCquestion } from '../types/model';

export default function MultipleChoiceQuestion({
  text,
  answers,
  // onPick,
  questionNumber,
}: MCquestion) {
  return (
    <>
      <Row>
        <Col>{text}</Col>
      </Row>
      <Row>
        <Col>
          <Form.Item>
            <Radio.Group>
              {answers.map(({ text, id, questionId }, i) => (
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
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
