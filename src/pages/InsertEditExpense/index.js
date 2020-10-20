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
import ShowAllExpenses from '../ShowAllExpenses';

import { Container, ContainerInputWithIcon, ContainerCheckbox } from './styles';
import InsertEvent from '../../components/GoogleCalendar';

function InsertEditExpense({ isEdit = false, expenseToEdit, expenses }) {
  const [createNewTag, setCreateNewTag] = useState(false);
  const [isExpensePaid, setIsExpensePaid] = useState(false);
  const [addRemember, setAddRemember] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const [tags, setTags] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    setTags(mockTags);
  }, []);

  useEffect(() => {
    if(!!expenseToEdit?.tag) 
      setSelectedOptionValue(expenseToEdit?.tag);
    if(!!expenseToEdit?.paid) 
      setIsExpensePaid(expenseToEdit?.paid);
    if(!!expenseToEdit?.reminderCreated) //! se nao é null
      setAddRemember(true);
  }, [expenseToEdit]);

  const onChangeOption = useCallback((optionValue) => {
    optionValue === "all" ? setSelectedOptionValue(null) : setSelectedOptionValue(optionValue);
  }, []);

  const handleSubmit = useCallback(async data => {
    try {
      console.log(data);
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required('Descrição obrigatória'),
        date: Yup.string().required('Data obrigatória'),
        value: Yup.number().required('Valor obrigatório').positive('Valor deve ser positivo.'),
      });
      console.log('DATA', data);
      await schema.validate(data, { abortEarly: false });

      console.log(addRemember);
      if (!addRemember) {
        InsertEvent(data.value, data.description, data.reminderDate);
      }
    } catch(err) {
      // const errors = err && getValidationErrors(err);
      // formRef.current.setErrors(errors);
    }
  }, []);

  return (
    <>
      {!showAll ?
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>{isEdit ? 'Edite sua despesa' : 'Insira sua despesa'}</h1>
            {(!createNewTag) ? 
              <ContainerInputWithIcon>
                <Select 
                  nullValue="all"
                  nullOption="Selecionar tag"
                  dataOptions={tags}
                  onChangeOption={onChangeOption}
                  selectedOptionValue={selectedOptionValue}
                />
                <button type="button" onClick={() => setCreateNewTag(true)}><GrAddCircle /></button>
              </ContainerInputWithIcon>
            : 
              <ContainerInputWithIcon>
                <Input name="tag" placeholder="Nova tag"/>
                <button type="button" onClick={() => setCreateNewTag(false)}><GrSubtractCircle /></button>
              </ContainerInputWithIcon>
            }
            <Input name="description" placeholder="Descrição" defaultValue={expenseToEdit?.description} />
            <Input name="date" type="date" defaultValue={expenseToEdit?.date} />
            <Input name="value" placeholder="Valor: 0,00" defaultValue={expenseToEdit?.value} />
            <ContainerCheckbox>
              <input type="checkbox" name="expensePaid" checked={isExpensePaid} onChange={() => setIsExpensePaid(!isExpensePaid)} />
              <label htmlFor="expensePaid" onClick={() => setIsExpensePaid(!isExpensePaid)}>Despesa paga</label>
            </ContainerCheckbox>
            {!isExpensePaid &&
              <>
                <ContainerCheckbox>
                  <input type="checkbox" name="addRemember" checked={addRemember} onChange={() => setAddRemember(!addRemember)} />
                  <label htmlFor="addRemember" onClick={() => setAddRemember(!addRemember)}>Adicionar lembrete</label>
                </ContainerCheckbox>
                {!!addRemember && <Input name="reminderDate" type="date" defaultValue={expenseToEdit?.reminderCreated} />}
              </>
            } 
            <Button type="submit">{isEdit ? 'Salvar alterações' : 'Inserir'}</Button>
          </Form>
          {isEdit && <Button type="return" onClick={() => setShowAll(true)}>Voltar</Button>}
        </Container>
      :
        <ShowAllExpenses expenses={expenses} />
      }
    </>
  );
}

export default InsertEditExpense;