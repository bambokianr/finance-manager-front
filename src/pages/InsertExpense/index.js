import React, { useCallback, useRef } from 'react';
//import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

function InsertExpense(){
  const formRef = useRef(null);
  const handleSubmit = useCallback(async data => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required('Descrição obrigatória'),
        date: Yup.string().required('Data obrigatória'),
        value: Yup.number().required('Valor obrigatório').positive('Valor deve ser positivo.'),
      });
      console.log('DATA', data);
      await schema.validate(data, { abortEarly: false });
    } catch(err) {
      const errors = getValidationErrors(err);
      formRef.current.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Insira sua despesa:</h1>
        <Input name="description" placeholder="Descrição"/>
        <Input name="date" type="date"/>
        <Input name="value" placeholder="Valor: 0,00"/>
        <Button type="submit">Inserir</Button>
      </Form>
    </Container>
  );
}

export default InsertExpense;