import React, { useRef, useState, useCallback } from 'react';

import { FiArrowDown } from 'react-icons/fi';

import { Container, SelectContainer } from './styles';

function ChartSelect({ nullValue, nullOption, dataOptions, onChangeOption = () => {}, selectedOptionValue }) {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container>
      <FiArrowDown />
      <SelectContainer 
        value={selectedOptionValue || nullValue}
        ref={selectRef}
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        isFocused={isFocused} 
        name="select" 
        onChange={() => onChangeOption(selectRef.current?.value)}
      >
        <option value={nullValue}>{nullOption}</option>
        {dataOptions.map(data => 
          <option key={data.tag} value={data.tag}>{data.tag}</option> 
        )} 
      </SelectContainer>
    </Container>
  );
}
export default ChartSelect;