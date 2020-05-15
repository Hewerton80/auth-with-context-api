import React, { FC, useCallback, useContext } from 'react';
import AuthContext from '../../contexts/auth.context';

// import { Container } from './styles';

const DashBoard: FC = () => {
  console.log('dashboard')
  const { singOut  } = useContext(AuthContext);

  const handleLogOut = useCallback(async ()=>{
    await singOut();
  },[singOut]);

  return (
    <button 
      onClick={handleLogOut}
    >
      Fazer logout
    </button>);
}

export default DashBoard;