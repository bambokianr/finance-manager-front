import React, { useState, useCallback } from 'react';

import { useAuth } from '../../hooks/AuthContext';
import { expenses, tags } from '../../utils/mocks';
import Modal from '../../components/Modal';
import InsertEditExpense from '../../pages/InsertEditExpense';
import ShowAllExpenses from '../../pages/ShowAllExpenses';
import BarChart from '../../components/BarChart';

import { FiCalendar, FiEdit, FiPower, FiPlusSquare } from 'react-icons/fi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
// import logoImg from '../../assets/logo.svg';

import { Container, Header, HeaderContent, Profile, ActionContent, Content, Overview, DayReminders, ContainerTitle, DayRemindersContent, ReminderContent, Expenses } from './styles';

function Dashboard() {
  const [isModalInsertExpenseVisible, setIsModalInsertExpenseVisible] = useState(false);
  const [isModalShowAllExpensesVisible, setIsModalShowAllExpensesVisible] = useState(false);
  const { signOut, user } = useAuth();

  const createExpense = useCallback(() => {
    setIsModalInsertExpenseVisible(true);
  }, []);

  const listAllExpenses = useCallback(() => {
    setIsModalShowAllExpensesVisible(true);
  }, []);

  return (
    <Container>
      {isModalInsertExpenseVisible && 
        <Modal onClose={() => setIsModalInsertExpenseVisible(false)}>
          <InsertEditExpense />
        </Modal>
      }
      {isModalShowAllExpensesVisible && 
        <Modal onClose={() => setIsModalShowAllExpensesVisible(false)}>
          <ShowAllExpenses expenses={expenses} />
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
        <Expenses>
          <ContainerTitle type="graph">
            <strong>Overview semanal</strong>
            <button type="button" onClick={listAllExpenses}><FiPlusSquare /></button>
          </ContainerTitle>
          <BarChart filterOptions={tags} data={expenses} />
        </Expenses>
      </Content>
    </Container>
  );
}
export default Dashboard;