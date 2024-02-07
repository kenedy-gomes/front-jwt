import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home.jsx"
import Filmes from "./pages/Filmes/filmes.jsx"
import Login from "./pages/Login/login.jsx"
import Register from "./pages/Register/register.jsx"
import { AuthProvider } from "./Components/Auth/AuthProvider.jsx";
import { parseCookies } from "nookies";

export function HandleUserRoutesAcess ({children})  {
    const {'filmes.token': token } = parseCookies();
    if (token) {
       return  children
    }else{
      return <Navigate to="/" />
    }
  }
  

const Routers  = () => {
    return (
           <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/filmes" element={<HandleUserRoutesAcess><Filmes /></HandleUserRoutesAcess>} />
                    <Route path="/home" element={<HandleUserRoutesAcess><Home/></HandleUserRoutesAcess>} />
                    <Route path="/register" element={<Register />} />
                </Routes>   
            </AuthProvider> 
    )
}

export default Routers;