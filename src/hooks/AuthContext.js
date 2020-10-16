import React, { createContext, useCallback, useState, useContext } from 'react';
// import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@FinanceManager:token');
    const user = localStorage.getItem('@FinanceManager:user');

    if(token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    // !!!! mock para autenticação
    // const response = await api.post('login', { email, password });
    // console.log(response.data);
    const response = { data: { user: {name: 'teste', email: 'teste@teste.teste' }, token: '123456789abcde' } };

    const { token, user } = response.data;
    localStorage.setItem('@FinanceManager:token', token);
    localStorage.setItem('@FinanceManager:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FinanceManager:token');
    localStorage.removeItem('@FinanceManager:user');
    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if(!context) 
    throw new Error();
  return context;
}

export { AuthProvider, useAuth };