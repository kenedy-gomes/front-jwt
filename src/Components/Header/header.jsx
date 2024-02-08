import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom"; 
import {
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  Select,
  Avatar,
  WrapItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import { Image } from '@chakra-ui/react'
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Header = () => {
  const {isLoggedIn, userProfile, handleLogout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const firstName = userProfile && userProfile.name ? userProfile.name.split(' ')[0] : '';

 

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    navigate(`/categoria/${category}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <Menu>
            <MenuButton
              color={"white"}  
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem>
                <ul>
                  <li>
                    <Link to="/">Inicio</Link>
                  </li>
                </ul>
              </MenuItem>
              <MenuItem>
                <ul>
                  <li>
                    <Link to="/series">Séries</Link>
                  </li>
                </ul>
              </MenuItem>
              <MenuItem>
                <ul>
                  <li>
                    <Link to="/lançamentos">Lançamentos</Link>
                  </li>
                </ul>
              </MenuItem>
              <MenuItem>
                <ul>
                  <li>
                    <Link to="/pedirfilmes">Pedir Filmes</Link>
                  </li>
                </ul>
              </MenuItem>
                <div className={styles.select}>
                   <Select variant='flushed' placeholder='Categorias'
                   value={selectedCategory}
                   onChange={handleCategoryChange}
                   style={{paddingLeft: "10px"}}
                   >
                     <option value='aventura'>Aventura</option>
                     <option value='comedia'>Comédia</option>
                     <option value='Drama'>Drama</option>
                     <option value='Documentario'>Documentário</option>
                     <option value='ficcionecientifica'>Ficção científica</option>
                     <option value='fantasia'>Fantasia</option>
                     <option value='faroeste'>Faroeste</option>
                     <option value='terror'>Terror</option>
                     <option value='romance'>Romance</option>
                     <option value='misterio'>Mistério</option>
                     <option value='acao'>Ação</option>
                   </Select>
                </div>
                  
                 
             </MenuList>
               </Menu>
          <div className={styles.logo}>
              <Image src={logo} alt='logo' width={"250px"} />
          </div>

          <div className={styles.search}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="gray.300" />
              </InputLeftElement>
              <Input color={"white"} type="tel" placeholder="Pesquisar..." width={"600px"} />
            </InputGroup>
          </div>

          <div className={styles.menu}>
            {isLoggedIn ? (
             <Menu isLazy> 
              <MenuButton >
                <WrapItem display={"flex"} justifyContent={"center"} alignItems={"center"} color={"white"} gap={2} fontFamily={"Inter, sans-serif"} fontWeight={"bold"}>
                 <p>Ola, {firstName}</p> <Avatar src={userProfile.avatarImg} />
                </WrapItem>
              </MenuButton>
              <MenuList>
                <MenuGroup title='Profile'>
                  <MenuItem onClick={() => navigate("/edit-profile")}>Meus dados</MenuItem>
                  <MenuItem>Opções</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Help'>
                  <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </MenuGroup>
              </MenuList>
           </Menu>
            ) : (
              <Button onClick={() => navigate("/")} colorScheme='red'>Entrar</Button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
