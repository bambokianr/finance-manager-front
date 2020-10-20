import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 40px; 
`;

export const ContainerTitle = styled.div`
  width: 96%;
  display: flex;
  align-items: center;

  strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }
`;

export const AllExpensesContent = styled.div`
  margin-top: 18px;
  height: 600px;
  overflow-y: scroll;
`;

export const ExpenseContent = styled.div`
  background: #3b3e47;
  display: flex;
  align-items: center;
  width: 98%;
  padding: 16px 24px;
  border-radius: 10px;
  margin: 8px 0;

  h1 {
    color: #fff;
    font-size: 16px;
  }

  span {
    color: #ff9000;
    margin-top: 4px;
    display: flex;
    align-items: center;

    svg {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
  }
`;

export const InfosExpense = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActionsContent = styled.div`
  margin-left: auto;
  display: flex;

  button {
    width: 40px;
    height: 40px;
    padding: 0;
    margin-left: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FF0202;
    border-radius: 4px;

    svg {
      color: #fff;
    }
  }

  button:first-of-type {
    background: #2EA44E;
  }
`;