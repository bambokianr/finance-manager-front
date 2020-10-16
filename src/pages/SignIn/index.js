import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

function SignIn() {
  const formRef = useRef(null);
  const { user, signIn } = useAuth();
  
  const handleSubmit = useCallback(async data => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });
      await schema.validate(data, { abortEarly: false });
      signIn({
        email: data.email,
        password: data.password,
      });
    } catch(err) {
      const errors = getValidationErrors(err);
      formRef.current.setErrors(errors);
    }
  }, [signIn]);

  console.log(user);

  return (
    <Container>
      {/* <img src={logoImg} alt="" /> */}
      <Form ref={formRef} onSubmit={handleSubmit}>
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