import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

export default function LogoutButton() {
  const history = useHistory();

  const handleLogOut = () => {
    console.log('logout');
    history.push('/');
  };

  return <Button onClick={handleLogOut}>Logout</Button>;
}
