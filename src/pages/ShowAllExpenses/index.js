import React, { useState, useCallback } from 'react';

import InsertEditExpense from '../InsertEditExpense';

import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiTag, FiEdit3, FiTrash2 } from 'react-icons/fi';

import { Container, ContainerTitle, ExpenseContent, AllExpensesContent, InfosExpense, ActionsContent } from './styles';

function ShowAllExpenses({ expenses }) {
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  
  const handleDeleteExpense = useCallback((id) => {
    console.log('id', id);
  }, []);

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
                  <button type="button" onClick={() => handleDeleteExpense(expense.id)}><FiTrash2 /></button>
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
        /> 
      }
    </>
  );
}
export default ShowAllExpenses;