import styled from 'styled-components';

export const Container = styled.div`
  h4 {
    color: #28262e;
    font-weight: 300;
    font-size: 14px;
    margin-top: 18px;
  }
`;

export const SelectContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  p {
    margin-right: 8px;
  }

  select {
    border: 1px solid #ff9000;
    border-radius: 4px;
    padding: 4px;
  }
`;

export const YAxisLabel = styled.div`
  margin: 16px 0 6px 38px;

  p {
    font-size: 14px;
    font-weight: 600;
    color: #666666;
  }
`;

export const CustomTooltipContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 12px 20px;
  width: 210px;
  border-radius: 6px;

  p {
    font-size: 14px;
  }

  p:first-child {
    font-weight: bold;
    font-size: 16px;
    color: #ff9000;
  }
`;