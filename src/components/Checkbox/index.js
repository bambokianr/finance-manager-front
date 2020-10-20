import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

function Checkbox({ name, label, isChecked = false, setIsChecked = () => {}, ...rest }) {
  const checkboxRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkboxRef.current,
      path: 'checked'
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <input ref={checkboxRef} type="checkbox" name={name} checked={isChecked} onChange={setIsChecked} {...rest} />
      <label htmlFor={name} onClick={setIsChecked}>{label}</label>
    </Container>
  );
}
export default Checkbox;