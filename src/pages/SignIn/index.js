import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Form } from './styles';

function SignIn() {
  return (
    <Container>
      {/* <img src={logoImg} alt="" /> */}
      <Form>
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