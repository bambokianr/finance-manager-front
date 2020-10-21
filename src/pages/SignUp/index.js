import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

function SignUp() {
  const formRef = useRef(null);
  const history = useHistory();

  const handleSubmit = useCallback(async data => {
    try {
      console.log('handleSubmit', data);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      await schema.validate(data, { abortEarly: false });
      
      const response = await api.post('/user', data);
      // const response = await api.post('/user', data, { credentials: 'include' });
      // const response = await api.post('/user', data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, crossDomain: true });
      console.log('RESPONSE', response);
      history.push('/');
    } catch(err) {
      const errors = getValidationErrors(err);
      formRef.current.setErrors(errors);
    }
  }, [history]);

  return (
    <Container>
      <img src={logoImg} alt="" width={220} style={{ marginBottom: '20px' }} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} placeholder="Nome"/>
        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
        <Button type="submit">Cadastrar</Button>
      </Form>
      <Link to="/">
        <FiArrowLeft />
        Voltar para login
      </Link>
    </Container>
  );
}

export default SignUp;