import React, { useRef, useState, useCallback } from 'react';

import { FiArrowDown } from 'react-icons/fi';

import { Container, SelectContainer } from './styles';

function Select({ nullValue, nullOption, dataOptions, onChangeOption = () => {}, isToChart = false, selectedOptionValue }) {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isToChart={isToChart}>
      <FiArrowDown />
      <SelectContainer 
        value={selectedOptionValue || nullValue}
        ref={selectRef}
        isToChart={isToChart} 
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        isFocused={isFocused} 
        name="select" 
        onChange={() => onChangeOption(selectRef.current?.value)}
      >
        <option value={nullValue}>{nullOption}</option>
        {dataOptions.map(data => 
          <option key={data} value={data}>{data}</option> 
        )} 
      </SelectContainer>
    </Container>
  );
}
export default Select;