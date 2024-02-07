import React, { createContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});
const URL = "http://localhost:8080/auth/login";
const URLUSER = "http://localhost:8080/usuarios/profile";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const { "filmes.token": token, "filmes.userProfile": profile } = parseCookies();
    if (token && profile) {
      setIsLoggedIn(true);
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  async function handleLogin(credentials) {
    try {
      const response = await axios.post(URL, {
        email: credentials.email,
        password: credentials.password,
      });
      const token = response.data.token;
      if (token) {
        setCookie(undefined, "filmes.token", token, {
          maxAge: 60 * 60 * 1, // 1 hora
        });
        const res = await axios.get(URLUSER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = res.data;
        setUserProfile(userData);
        setCookie(undefined, "filmes.userProfile", JSON.stringify(userData), {
          maxAge: 60 * 60 * 1, // 1 hora
        });
        toast({
          title: "Login efetuado com sucesso",
          status: "success",
          duration: 9000,
          colorScheme: "green",
        });
        setIsLoggedIn(true);
        navigate("/home");
      }
    } catch (error) {
      toast({
        title: "Erro ao efetuar login",
        status: "error",
        duration: 9000,
        colorScheme: "red",
      })
      handleLoginFailed(error);
    }
  }

  function handleLogout() {
    destroyCookie(undefined, "filmes.token");
    destroyCookie(undefined, "filmes.userProfile");
    setIsLoggedIn(false);
    setUserProfile({});
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ handleLogin, isLoggedIn, userProfile, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
