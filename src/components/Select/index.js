import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';

import { FiArrowDown } from 'react-icons/fi';

import { Container, SelectContainer } from './styles';

function Select({ name, nullValue, nullOption, dataOptions, onChangeOption = () => {}, selectedOptionValue }) {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, registerField } = useField(name);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

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
        {dataOptions?.map(data => 
          <option key={data} value={data}>{data}</option> 
        )} 
      </SelectContainer>
    </Container>
  );
}
export default Select;