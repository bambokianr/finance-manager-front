import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

function SignIn() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      {/* <img src={logoImg} alt="" /> */}
      <Form onSubmit={handleSubmit}>
        <h1>Faça seu login</h1>
        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
        <Button type="submit">Entrar</Button>
      </Form>
      <a href="">
        <FiLogIn />
        Criar conta
      </a>
    </Container>
  );
}

export default SignIn;