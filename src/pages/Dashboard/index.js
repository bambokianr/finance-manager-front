import React, { useState, useCallback, useEffect } from 'react';

import { useAuth } from '../../hooks/AuthContext';
import { expenses, tags as tagMocks } from '../../utils/mocks';
import Modal from '../../components/Modal';
import InsertEditExpense from '../../pages/InsertEditExpense';
import ShowAllExpenses from '../../pages/ShowAllExpenses';
import BarChart from '../../components/BarChart';

import logoImg from '../../assets/logoicon.png';

import { FiCalendar, FiEdit, FiPower, FiPlusSquare } from 'react-icons/fi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

import { Container, Header, HeaderContent, Profile, ActionContent, Content, Overview, DayReminders, ContainerTitle, DayRemindersContent, ReminderContent, Expenses } from './styles';
import OpenCalendar from '../../components/GoogleCalendar/openCalendar';

function Dashboard() {
  const [isModalInsertExpenseVisible, setIsModalInsertExpenseVisible] = useState(false);
  const [isModalShowAllExpensesVisible, setIsModalShowAllExpensesVisible] = useState(false);
  const [dayRemindersData, setDayRemindersData] = useState([]);
  const [tags, setTags] = useState([]);
  const [expensesChartData, setExpensesChartData] = useState([]);
  const { signOut, user } = useAuth();

  const createExpense = useCallback(() => {
    setIsModalInsertExpenseVisible(true);
  }, []);

  const listAllExpenses = useCallback(() => {
    setIsModalShowAllExpensesVisible(true);
  }, []);

  useEffect(() => {
    //! LEMBRETES DO DIA: [GET /expenses] -> query param = data do dia
    setDayRemindersData(expenses);

    //! OVERVIEW SEMANAL: [GET /tags] -> query param = data do dia
    setTags(tagMocks);

    //! OVERVIEW SEMANAL: [GET /expensesToChart]
    setExpensesChartData(expenses);


  }, []);

  return (
    <Container isModal={!!isModalInsertExpenseVisible || !!isModalShowAllExpensesVisible}>
      {isModalInsertExpenseVisible && 
        <Modal onClose={() => setIsModalInsertExpenseVisible(false)}>
          <InsertEditExpense onClose={() => setIsModalInsertExpenseVisible(false)} />
        </Modal>
      }
      {isModalShowAllExpensesVisible && 
        <Modal onClose={() => setIsModalShowAllExpensesVisible(false)}>
          <ShowAllExpenses expenses={expenses} onClose={() => setIsModalShowAllExpensesVisible(false)} />
        </Modal>
      }
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="" width={50} style={{ marginLeft: '16px', marginRight: '8px' }} />
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
          <DayReminders>
            <ContainerTitle>
              <strong>Lembretes do dia</strong>
              <button type="button" onClick={() => OpenCalendar()}><FiCalendar /></button>
            </ContainerTitle>
            <DayRemindersContent>
              {dayRemindersData.length === 0 && <h4>Você não possui lembretes para hoje!</h4>}
              {dayRemindersData.map(({ id, description, value }) => 
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
          <BarChart filterOptions={tags} data={expensesChartData} />
        </Expenses>
      </Content>
    </Container>
  );
}
export default Dashboard;