import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import Routers from './routes.jsx'
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ChakraProvider>
        <BrowserRouter>
           <Routers />
        </BrowserRouter>
      </ChakraProvider>
  </React.StrictMode>,
)
