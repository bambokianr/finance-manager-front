import React, { useState } from 'react';

import { useAuth } from '../../hooks/AuthContext';
import Modal from '../../components/Modal';
import InsertExpense from '../../pages/InsertExpense';

import { FiEdit, FiPower } from 'react-icons/fi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
// import logoImg from '../../assets/logo.svg';

import { Container, Header, HeaderContent, Profile, ActionContent, Content, Overview, DayReminders, DayRemindersContent, ReminderContent, LastExpenses } from './styles';

const mock = [
  {
    description: 'descrição 1 do lembrete e tals lorem ipsum dolor amet',
    value: 'R$ 1235,34'
  },
  {
    description: 'descriçãoasfsad sdf das fsd 1 do lembrete e tals lorem ipsum dolor amet',
    value: 'R$ 1235,34'
  },
  {
    description: 'descriçãoasfsad sdf das fsd 1 do lembrete e tals lorem ipsum dolor amet',
    value: 'R$ 1235,34'
  },
  {
    description: 'descriçãoasfsad sdf das fsd 1 do lembrete e tals lorem ipsum dolor amet',
    value: 'R$ 1235,34'
  },
];

function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { signOut, user } = useAuth();

  function createExpense() {
    // alert('create expense');
    setIsModalVisible(true);
  }

  return (
    <Container>
      {isModalVisible && 
        <Modal onClose={() => setIsModalVisible(false)}>
          <InsertExpense />
        </Modal>
      }
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
      <Content>
        <Overview>
          <h1>Overview de despesas</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <DayReminders>
            <strong>Lembretes do dia</strong>
            <DayRemindersContent>
              {mock.map(reminder => 
                <ReminderContent>
                  <p>{reminder.description}</p>
                  <span>
                    <FaRegMoneyBillAlt />
                    {reminder.value}
                  </span>
                </ReminderContent>
              )}
            </DayRemindersContent>
          </DayReminders>
        </Overview>
        <LastExpenses />
      </Content>
    </Container>
  );
}
export default Dashboard;