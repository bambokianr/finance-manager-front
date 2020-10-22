import React, { useState, useCallback, useEffect } from 'react';

import Modal from '../../components/Modal';
import InsertEditExpense from '../../pages/InsertEditExpense';
import ShowAllExpenses from '../../pages/ShowAllExpenses';
import BarChart from '../../components/BarChart';

import OpenCalendar from '../../components/GoogleCalendar/openCalendar';
import logoImg from '../../assets/logoicon.png';
import { useAuth } from '../../hooks/AuthContext';
import { formatDate } from '../../utils/formatDate';
import api from '../../services/api';

import { FiCalendar, FiEdit, FiPower, FiPlusSquare } from 'react-icons/fi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

import { Container, Header, HeaderContent, Profile, ActionContent, Content, Overview, DayReminders, ContainerTitle, DayRemindersContent, ReminderContent, Expenses } from './styles';

function Dashboard() {
  const [isModalInsertExpenseVisible, setIsModalInsertExpenseVisible] = useState(false);
  const [isModalShowAllExpensesVisible, setIsModalShowAllExpensesVisible] = useState(false);
  const [dayRemindersData, setDayRemindersData] = useState([]);
  const [tags, setTags] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [expensesChartData, setExpensesChartData] = useState([]);
  const { signOut, user, token } = useAuth();

  const createExpense = useCallback(() => {
    setIsModalInsertExpenseVisible(true);
  }, []);

  const listAllExpenses = useCallback(() => {
    setIsModalShowAllExpensesVisible(true);
  }, []);

  const getDayExpenses = useCallback(async () => {
  //! LEMBRETES DO DIA: [GET /expenses] -> query param = data do dia
  const today = formatDate(new Date());
  await api.get(`/expense?token=${token}&reminderCreated=${today}`)
    .then(res => {
      console.log('[RES - getDayExpenses]', res);
      setDayRemindersData(res.data);
    })
    .catch(err => {
      console.log('[ERR - getDayExpenses]', err);
    });
  }, [token]);

  const getAllExpenses = useCallback(async () => {
    //! LEMBRETES DO DIA: [GET /expenses] -> query param = data do dia
    await api.get(`/expense?token=${token}`)
    .then(res => {
      console.log('[RES - getAllExpenses]', res);
      setAllExpenses(res.data);
    })
    .catch(err => {
      console.log('[ERR - getAllExpenses]', err);
    });
  }, [token]);

  const getTags = useCallback(async () => {
    //! OVERVIEW SEMANAL: [GET /tags]
    await api.get(`/tag?token=${token}`)
    .then(res => {
      console.log('[RES - getTags]', res);
      setTags(res.data);
    })
    .catch(err => {
      console.log('[ERR - getTags]', err);
    });
  }, [token]);

  const getExpensesChartData = useCallback(async () => {
    console.log('getExpensesChartData');
    //! OVERVIEW SEMANAL: [GET /expensesToChart]
    await api.get(`/expensestochart?token=${token}`)
      .then(res => {
        console.log('[RES - getExpensesChartData]', res);
        setExpensesChartData(res.data);
      })
      .catch(err => {
        console.log('[ERR - getExpensesChartData]', err);
      });
  }, [token]);

  useEffect(() => {
    if(!isModalInsertExpenseVisible && !isModalShowAllExpensesVisible) {
      getDayExpenses();
      getAllExpenses();
      getTags();
      getExpensesChartData();
    }
  }, [isModalInsertExpenseVisible, isModalShowAllExpensesVisible, getAllExpenses, getDayExpenses, getExpensesChartData, getTags]);

  return (
    <Container isModal={!!isModalInsertExpenseVisible || !!isModalShowAllExpensesVisible}>
      {isModalInsertExpenseVisible && 
        <Modal onClose={() => setIsModalInsertExpenseVisible(false)}>
          <InsertEditExpense tagsToSelect={tags} onClose={() => setIsModalInsertExpenseVisible(false)} />
        </Modal>
      }
      {isModalShowAllExpensesVisible && 
        <Modal onClose={() => setIsModalShowAllExpensesVisible(false)}>
          <ShowAllExpenses tagsToSelect={tags} expenses={allExpenses} onClose={() => setIsModalShowAllExpensesVisible(false)} />
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
              {dayRemindersData.map(({ id_expense, description, value }) => 
                <ReminderContent key={id_expense}>
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
            {allExpenses.length !== 0 && <button type="button" onClick={listAllExpenses}><FiPlusSquare /></button>}
          </ContainerTitle>
          <BarChart filterOptions={tags} data={expensesChartData} />
        </Expenses>
      </Content>
    </Container>
  );
}
export default Dashboard;