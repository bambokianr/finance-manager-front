import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

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
    await api.post('/user/login', { email, password })
      .then(res => {
        const token = res.data.token;
        const user = { name: res.data.name, email: res.data.email };

        localStorage.setItem('@FinanceManager:token', token);
        localStorage.setItem('@FinanceManager:user', JSON.stringify(user));
        setData({ token, user });
      })
      .catch(err => {
        console.log(err);
        alert('Login inválido. Tente novamente!');
      });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FinanceManager:token');
    localStorage.removeItem('@FinanceManager:user');
    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut }}>
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