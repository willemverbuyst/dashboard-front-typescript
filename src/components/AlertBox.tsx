import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessage } from '../store/appState/selectors';
import { clearMessage } from '../store/appState/actions';
import { Alert } from 'antd';

const AlertBox = (): ReactElement | null => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  return message ? (
    <Alert
      type={message.variant}
      closable={message.dismissable}
      onClose={() => dispatch(clearMessage())}
      message={message.text}
    />
  ) : null;
};

export default AlertBox;
