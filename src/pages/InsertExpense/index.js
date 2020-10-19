import React, { useCallback, useEffect, useRef, useState } from 'react';
//import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { GrSubtractCircle, GrAddCircle } from 'react-icons/gr';
import { tags as mockTags } from '../../utils/mocks';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, ContainerInputWithIcon } from './styles';

function InsertExpense() {
  const [createNewTag, setCreateNewTag] = useState(false);
  const [isExpensePaid, setIsExpensePaid] = useState(false);
  const [tags, setTags] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    setTags(mockTags);
  }, []);

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
        {(!createNewTag) ? 
          <ContainerInputWithIcon>
            <select name="select" onChange={() => {}}>
            <option value="all"></option>
              {tags.map(tag => 
                <option key={tag} value={tag}>{tag}</option> 
              )} 
            </select>
            <button type="button" onClick={() => setCreateNewTag(true)}><GrAddCircle /></button>
          </ContainerInputWithIcon>
        : 
          <ContainerInputWithIcon>
            <Input name="tag" placeholder="Nova tag"/>
            <button type="button" onClick={() => setCreateNewTag(false)}><GrSubtractCircle /></button>
          </ContainerInputWithIcon>
        }
        <Input name="description" placeholder="Descrição"/>
        <Input name="date" type="date"/>
        <Input name="value" placeholder="Valor: 0,00"/>
        <input type="checkbox" name="expensePaid" checked={isExpensePaid} onClick={() => setIsExpensePaid(!isExpensePaid)} />
        <label for="expensePaid">{!!isExpensePaid ? 'Despesa paga' : 'Despesa não paga'}</label>
        {/* ADICIONAR LEMBRETE - prazo para pagar a despeza */}
        {!isExpensePaid && <Input name="date" type="date"/>} 
        <Button type="submit">Inserir</Button>
      </Form>
    </Container>
  );
}

export default InsertExpense;