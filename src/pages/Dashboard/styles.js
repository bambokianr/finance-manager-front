import styled from 'styled-components';

export const Container = styled.div`
`;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  /* > img { */
    /* estilizar logo */
  /* } */
`;

export const ActionContent = styled.div`
  margin-left: auto;

  button:first-of-type {
    svg { color: #ff9000; }
  }

  button {
    padding-left: 32px;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex; 
  align-items: center;
  margin-left: 80px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #F4EDE8;
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Overview = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;

    span + span {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 1px solid #ff9000;
    }
  }
`;

export const Expenses = styled.aside`
  width: 500px;
  margin-top: 140px;
`;

export const DayReminders = styled.div`
  margin-top: 64px;
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

  button {
    background: transparent;
    border: 0;
    margin-left: auto;

    svg {
      color: #ff9000;
      width: 20px;
      height: 20px;
    }
  }
`;

export const DayRemindersContent = styled.div`
  margin-top: 12px;
  height: 368px;
  overflow-y: scroll;
`;

export const ReminderContent = styled.div`
  background: #3b3e47;
  display: flex;
  flex-direction: column;
  width: 96%;
  padding: 16px 24px;
  border-radius: 10px;
  margin: 8px 0;

  span {
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