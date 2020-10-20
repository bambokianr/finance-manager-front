import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  margin-top: 60px;

  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 8px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }

  form {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 340px;

    h1 {
      margin-bottom: 24px;
    }
  }
`;

export const ContainerInputWithIcon = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const ContainerCheckbox = styled.div`
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