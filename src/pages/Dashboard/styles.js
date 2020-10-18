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