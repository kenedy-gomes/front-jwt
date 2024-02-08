import { Image } from "@chakra-ui/react";
import Header from "../Header/header";
import styles from "./editProfile.module.css";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext } from "react";


const editProfile = () => {
    const {userProfile} = useContext(AuthContext);
    
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerEdit}>
        <div className={styles.content}>
          <div className={styles.profile}>
            <h1 className={`${styles.name} ${styles.uppercase}`}>{userProfile.name}</h1>
            <p>{userProfile.role}</p>
          </div>
          <div className={styles.editAvatar}>
            <Image
              borderRadius={"100%"}
              width={"100px"}
              height={"100px"}
              objectFit={"cover"}
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <div className={styles.edit} >
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
          </div>
        </div>

        <div className={styles.formEdit}>
          <div className={styles.title}>
            <h1>Editar Perfil</h1>
          </div>
          <form className={styles.form} action="">
            <Input type="text" placeholder="Nome completo" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Button type="submit">Salvar</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default editProfile;
