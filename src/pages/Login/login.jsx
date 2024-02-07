import React, { useContext, useState } from "react";
import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import {AuthContext} from '../../Components/Auth/AuthProvider'

 
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { handleLogin } = useContext(AuthContext);


  async function onSubmit(data) {
     await handleLogin(data);
  }
 
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <div className="mb-3">
          <Input
            color={"white"}
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <InputGroup size="md">
            <Input
              color={"white"}
              pr="4.5rem"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres"
                }
              })}
            />
            <InputRightElement width="4.5rem">
              <Button backgroundColor={"transparent"} _hover={{ backgroundColor: "transparent" }}  h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                {showPassword ? <ViewIcon color={"white"} /> : <ViewOffIcon color={"white"} />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <div className={styles.containerButton}>
          <Button colorScheme="red" type="submit">Entrar</Button>
          <p>
            Novo por aqui?{" "}
            <Link className={styles.link} to="/register">
              Crie uma conta
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
