import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;

  svg {
    position: absolute;
    z-index: 10;
    color: #fff;
    right: 12px;
    top: 20px;
    top: ${props => props.isToChart ? '8px' : '20px'};
  }
`;

export const SelectContainer = styled.select`
  width: 100%;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #F1F2F6;
  padding: 16px;
  -webkit-appearance: none;

  ${props => props.isFocused && css`
    border-color: #ff9000;
  `}
`;