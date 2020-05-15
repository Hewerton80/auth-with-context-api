import React, { FC } from 'react';
import Routes from './routes'
import {AuthProvider} from './contexts/auth.context';
import {BrowserRouter} from 'react-router-dom';
const App: FC = ()=> {
  return (
    <BrowserRouter>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
