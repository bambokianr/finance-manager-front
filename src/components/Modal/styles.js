import styled from 'styled-components';

export const ModalContent = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  background: #FFF;
  width: 60%;
  height: 60%;
  border-radius: 8px;
  
  display: flex;
  flex-direction: column;

  button {
    background: transparent;
    border: 0;
    margin-left: auto;
    padding: 16px 12px;

    svg {
      color: #999591;
      width: 22px;
      height: 22px;
    }
  }
`;

export const Content = styled.div`

`;