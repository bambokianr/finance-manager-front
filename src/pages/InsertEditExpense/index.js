import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { GrSubtractCircle, GrAddCircle } from 'react-icons/gr';
import { tags as mockTags } from '../../utils/mocks';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import ShowAllExpenses from '../ShowAllExpenses';

import InsertEvent from '../../components/GoogleCalendar/insertEvent';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

import { Container, ContainerInputWithIcon } from './styles';

function InsertEditExpense({ isEdit = false, expenseToEdit, expenses, onClose = () => {} }) {
  const [createNewTag, setCreateNewTag] = useState(false);
  const [isExpensePaid, setIsExpensePaid] = useState(false);
  const [addRemember, setAddRemember] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const [tags, setTags] = useState([]);
  const formRef = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    if(!!expenseToEdit?.tag) 
      setSelectedOptionValue(expenseToEdit?.tag);
    if(!!expenseToEdit?.paid) 
      setIsExpensePaid(expenseToEdit?.paid);
    if(!!expenseToEdit?.reminderCreated) //! se nao é null
      setAddRemember(true);
  }, [expenseToEdit]);

  async function getTags() {
    await api.get(`/tag?token=${token}`)
      .then(res => {
        console.log('[RES - getTags]', res);
        setTags(res.data);
      })
      .catch(err => {
        console.log('[ERR - getTags]', err);
      });
  };

  // useEffect(() => {console.log('createNewTag', createNewTag)}, [createNewTag]);

  async function createExpense(data) {
    if(!!createNewTag) {
      
      await api.post('tag', { token, tag: data.tag })
        .then(res => {
          console.log('criar tag', res);
        })
        .catch(err => {
          console.log('[ERR - createTag]', err);
        });
    }

    const dataToSend = { token, ...data, value: Number.parseFloat(data.value) };
    console.log('CREATE EXPENSE!', dataToSend);
    await api.post('/expense', dataToSend)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('[ERR - createExpense]', err);
      });
  };

  async function editExpense(data) {
    const dataToSend = { token, ...data, value: Number.parseFloat(data.value) };
    console.log('EDIT EXPENSE!', dataToSend);
    await api.put('/expense', dataToSend)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('[ERR - editExpense]', err);
      });
  };

  useEffect(() => {
    getTags();
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
        value: Yup.string().required('Valor obrigatório'),
      });
      
      console.log('DATA', data);
      !!isEdit ? editExpense(data) : createExpense(data);

      await schema.validate(data, { abortEarly: false });
      onClose();
    } catch(err) {
      const errors = err && getValidationErrors(err);
      formRef.current.setErrors(errors);
    }

    if (data.addRemember) {
      InsertEvent(data.value, data.description, data.reminderDate);
    }
  }, [onClose, createNewTag]);

  return (
    <>
      {!showAll ?
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>{isEdit ? 'Edite sua despesa' : 'Insira sua despesa'}</h1>
            {!createNewTag ? 
              <ContainerInputWithIcon>
                <Select 
                  name="tag"
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
            <Checkbox 
              name="expensePaid" 
              label="Despesa paga" 
              isChecked={isExpensePaid}
              setIsChecked={() => setIsExpensePaid(!isExpensePaid)}
            />
            {!isExpensePaid &&
              <>
                <Checkbox 
                  name="addRemember" 
                  label="Adicionar lembrete" 
                  isChecked={addRemember}
                  setIsChecked={() => setAddRemember(!addRemember)}
                />
                {!!addRemember && <Input name="reminderDate" type="date" defaultValue={expenseToEdit?.reminderCreated} />}
              </>
            } 
            <Button type="submit">{isEdit ? 'Salvar alterações' : 'Inserir'}</Button>
          </Form>
          {isEdit && <Button type="return" onClick={() => setShowAll(true)}>Voltar</Button>}
        </Container>
      :
        <ShowAllExpenses expenses={expenses} onClose={onClose} />
      }
    </>
  );
}
export default InsertEditExpense;