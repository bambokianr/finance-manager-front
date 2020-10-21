import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 160px;
  position: relative;

  svg {
    position: absolute;
    z-index: 10;
    color: #ff9000;
    right: 12px;
    top: 20px;
    top: 8px;
  }
`;

export const SelectContainer = styled.select`
  width: 100%;
  background: #F1F2F6;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #232129;
  padding: 16px;
  padding-left: 10px !important;
  -webkit-appearance: none;

  ${props => props.isFocused && css`
    border-color: #ff9000;
  `}
`;