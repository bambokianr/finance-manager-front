import React from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Form } from './styles';

function SignUp() {
  return (
    <Container>
      <Form>
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} placeholder="Nome"/>
        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
        <Button type="submit">Cadastrar</Button>
      </Form>
      <a href="">
        <FiArrowLeft />
        Voltar para login
      </a>
    </Container>
  );
}

export default SignUp;