import React, { useState, useCallback } from 'react';

import InsertEditExpense from '../InsertEditExpense';

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiTag, FiEdit3, FiTrash2 } from 'react-icons/fi';

import { Container, ContainerTitle, ExpenseContent, AllExpensesContent, InfosExpense, ActionsContent } from './styles';

function ShowAllExpenses({ expenses, onClose = () => {} }) {
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const { token } = useAuth();

  async function deleteExpense(id) {
    await api.delete(`/expense?token=${token}`, { id })
    .then(res => {
      console.log('res', res);
    })
    .catch(err => {
      console.log('[ERR - deleteExpense]', err);
    });
  };

  const handleEditExpense = useCallback((expense) => {
    setExpenseToEdit(expense);
  }, []);

  return (
    <>
      {!expenseToEdit ?
        <Container>
          <ContainerTitle>
            <strong>Todas as despesas salvas</strong>
          </ContainerTitle>
          <AllExpensesContent>
            {expenses && expenses.map(expense => 
              <ExpenseContent key={expense.id}>
                <InfosExpense>
                  <h1>{expense.description}</h1>
                  {expense?.tag && <span>
                    <FiTag />
                    {expense.tag}
                  </span>}
                  <span>
                    <FaRegMoneyBillAlt />
                    {`R$ ${expense.value.toFixed(2)}`}
                  </span>
                </InfosExpense>
                <ActionsContent>
                  <button type="button" onClick={() => handleEditExpense(expense)}><FiEdit3 /></button>
                  <button type="button" onClick={() => deleteExpense(expense.id)}><FiTrash2 /></button>
                </ActionsContent>
              </ExpenseContent>
            )}
          </AllExpensesContent>
        </Container>
      : 
        <InsertEditExpense 
          isEdit={true}
          expenseToEdit={expenseToEdit}
          expenses={expenses}
          onClose={onClose}
        /> 
      }
    </>
  );
}
export default ShowAllExpenses;