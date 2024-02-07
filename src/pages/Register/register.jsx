import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
 } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const URL = "http://localhost:8080/auth/register";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toast = useToast();

  async function onSubmit(data) {
    try {
      const response = await axios.post(URL, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response);
      if(response.status === 200){
        toast({
            title: "Registro efetuado com sucesso",
            status: "success",
            duration: 9000,
            colorScheme: "green",
          });
          navigate("/");
      }
    
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast({
          title: "Email já registrado",
          status: "error",
          duration: 9000,
          colorScheme: "red",
        });
      } else {
        toast({
          title: "Verifique se todos os campos foram preenchidos corretamente",
          status: "error",
          duration: 9000,
          colorScheme: "red",
        });
      }
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Register</h1>
        <div className="mb-3">
          <Input
            _focus={{ backgroundColor: "transparent" }}
            _hover={{ backgroundColor: "transparent" }}
            color={"white"}
            type="name"
            placeholder="Nome Completo"
            {...register("name", {
              required: "name é obrigatório",
              pattern: {
                message: "name inválido",
              },
            })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <Input
            _focus={{ backgroundColor: "transparent" }}
            _hover={{ backgroundColor: "transparent" }}
            color={"white"}
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <InputGroup size="md">
            <Input
              _focus={{ backgroundColor: "transparent" }}
              _hover={{ backgroundColor: "transparent" }}
              color={"white"}
              pr="4.5rem"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres",
                },
              })}
            />
            <InputRightElement width="4.5rem">
              <Button
                backgroundColor={"transparent"}
                _hover={{ backgroundColor: "transparent" }}
                h="1.75rem"
                size="sm"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <ViewIcon color={"white"} />
                ) : (
                  <ViewOffIcon color={"white"} />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.containerButton}>
          <Button colorScheme="red" type="submit">
            Entrar
          </Button>
          <p>
            Já possui uma conta?{" "}
            <Link className={styles.link} to="/">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
