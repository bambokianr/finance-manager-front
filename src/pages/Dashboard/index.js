import React, { useState, useCallback } from 'react';

import { useAuth } from '../../hooks/AuthContext';
import { expenses, tags } from '../../utils/mocks';
import Modal from '../../components/Modal';
import InsertExpense from '../../pages/InsertExpense';
import BarChart from '../../components/BarChart';

import { FiCalendar, FiEdit, FiPower, FiPlusSquare } from 'react-icons/fi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
// import logoImg from '../../assets/logo.svg';

import { Container, Header, HeaderContent, Profile, ActionContent, Content, Overview, DayReminders, ContainerTitle, DayRemindersContent, ReminderContent, LastExpenses } from './styles';



function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { signOut, user } = useAuth();

  const createExpense = useCallback(() => {
    setIsModalVisible(true);
  }, []);

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
          <h1>Dashboard de despesas</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <DayReminders>
            <ContainerTitle>
              <strong>Lembretes do dia</strong>
              <button type="button" onClick={() => alert('abrir google calendar?')}><FiCalendar /></button>
            </ContainerTitle>
            <DayRemindersContent>
              {expenses.map(({ id, description, value }) => 
                <ReminderContent key={id}>
                  <p>{description}</p>
                  <span>
                    <FaRegMoneyBillAlt />
                    {`R$ ${value.toFixed(2)}`}
                  </span>
                </ReminderContent>
              )}
            </DayRemindersContent>
          </DayReminders>
        </Overview>
        <LastExpenses>
          <ContainerTitle style={{ marginLeft: '20px' }}>
            <strong>Overview semanal</strong>
            <button type="button" onClick={() => alert('modal listando todos os expenses - para crud')}><FiPlusSquare /></button>
          </ContainerTitle>
          <BarChart filterOptions={tags} data={expenses} />
        </LastExpenses>
      </Content>
    </Container>
  );
}
export default Dashboard;