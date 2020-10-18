import React, { useState } from 'react';

import { useAuth } from '../../hooks/AuthContext';

import { Container, Header, HeaderContent, Profile, ActionContent } from './styles';

import { FiEdit, FiPower } from 'react-icons/fi';
// import logoImg from '../../assets/logo.svg';

function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { signOut, user } = useAuth();

  function createExpense() {
    // alert('create expense');
    setIsModalVisible(true);
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          {/* <img src={logoImg} alt="" /> */}
          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <ActionContent>
            <button tyle="button" onClick={createExpense}>
              <FiEdit />
            </button>
            <button tyle="button" onClick={signOut}>
              <FiPower />
            </button>
          </ActionContent>
        </HeaderContent>
      </Header>
      {isModalVisible && <h1>Modal</h1>}
    </Container>
  );
}
export default Dashboard;