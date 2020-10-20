import React, { useCallback, useEffect, useRef, useState } from 'react';
//import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { GrSubtractCircle, GrAddCircle } from 'react-icons/gr';
import { tags as mockTags } from '../../utils/mocks';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Container, ContainerInputWithIcon, ContainerCheckbox } from './styles';

function InsertExpense() {
  const [createNewTag, setCreateNewTag] = useState(false);
  const [isExpensePaid, setIsExpensePaid] = useState(false);
  const [addRemember, setAddRemember] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const [tags, setTags] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    setTags(mockTags);
  }, []);

  const onChangeOption = useCallback((optionValue) => {
    optionValue === "all" ? setSelectedOptionValue(null) : setSelectedOptionValue(optionValue);
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
            <Select 
              nullValue="all"
              nullOption="Selecionar tag"
              dataOptions={tags}
              onChangeOption={onChangeOption}
            />
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
        <ContainerCheckbox>
          <input type="checkbox" name="expensePaid" checked={isExpensePaid} onClick={() => setIsExpensePaid(!isExpensePaid)} />
          <label htmlFor="expensePaid" onClick={() => setIsExpensePaid(!isExpensePaid)}>Despesa paga</label>
        </ContainerCheckbox>
        {!isExpensePaid &&
          <>
            <ContainerCheckbox>
              <input type="checkbox" name="addRemember" checked={addRemember} onClick={() => setAddRemember(!addRemember)} />
              <label htmlFor="addRemember" onClick={() => setAddRemember(!addRemember)}>Adicionar lembrete</label>
            </ContainerCheckbox>
            {!!addRemember && <Input name="date" type="date"/>}
          </>
        } 
        <Button type="submit">Inserir</Button>
      </Form>
    </Container>
  );
}

export default InsertExpense;