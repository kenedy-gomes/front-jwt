import { Navigate, Route, Routes, Outlet} from "react-router-dom";

import Home from "./pages/Home/home.jsx";
import Filmes from "./pages/Filmes/filmes.jsx";
import Register from "./pages/Register/register.jsx";
import Login from "./pages/Login/login.jsx";
import EditProfile from "./Components/EditProfile/editProfile.jsx";
import { AuthProvider} from "./Components/Auth/AuthProvider.jsx";
import { parseCookies } from "nookies";

 

export function HandleUserRoutes() {
  const {'filmes.token': token } = parseCookies();
  return token ? <Navigate to="/home" /> : <Navigate to="/" />
}


function HandleUserRoutesAcess() {
  const {'filmes.token': token } = parseCookies();
  return token ? <Outlet/> : <Navigate to="/" />
}

const Routers = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route element={<HandleUserRoutesAcess />}>
            <Route path="/filmes" element={<Filmes />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/edit-profile" element={<EditProfile/>} />
          </Route>
        <Route path="/register" element={<Register />} />
      </Routes>   
    </AuthProvider> 
  );
}

export default Routers;
