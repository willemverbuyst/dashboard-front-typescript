import React from 'react';
import { Radio, Form, Row, Col } from 'antd';
import { MCquestionDisplay } from '../types/test-models';

export default function MultipleChoiceQuestion({
  text,
  answers,
  questionNumber,
  questionId,
  onChange,
}: MCquestionDisplay) {
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
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
