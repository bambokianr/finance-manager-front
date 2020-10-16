import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';
// import InsertExpense from './pages/InsertExpense';

import { AuthProvider } from './hooks/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
