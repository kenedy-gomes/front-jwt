 
 import styles from './home.module.css'
 import Header from "../../Components/Header/header";
import TabsList from '../../Components/Tabs/tabsList';


        
 const Home = () => {
    return (
        <div className={styles.container}>
            <Header/>
           <div className={styles.content}>
               <div className={styles.containerList}>
                     <div className={styles.titleList}>
                        <h1>Filmes</h1>
                     </div>
                     <div>
                        <TabsList/>
                     </div>
               </div>
                  
            </div> 
        </div>
    )
}

export default Home;