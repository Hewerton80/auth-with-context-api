import React, { FC, useCallback, useContext, useState } from 'react';
import AuthContext from '../../../contexts/auth.context';
import {useHistory} from 'react-router-dom'
const SingInApp: FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { singIn } = useContext(AuthContext);
  const handleLogin = useCallback(async ()=>{
    setLoading(true);
    await singIn();
    history.push('/dashboard');
    setLoading(false);
  },[singIn,history]);

  return (
    <button 
      onClick={handleLogin}
      disabled={loading}
    >
      Fazer login
    </button>);
}

export default SingInApp;