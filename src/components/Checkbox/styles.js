import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0 16px;

  input {
    width: 20px;
    height: 20px;
    border: 1px solid #ff9000;
    background: #ff9000;
    margin-right: 10px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }
`;