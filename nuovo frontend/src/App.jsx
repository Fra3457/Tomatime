import { useState } from 'react'
import Home from "./components/Home/Home.jsx"
import Login from './components/login/log.jsx';
import LyfeCycle from './components/lifecycle/index.jsx';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.jsx';
import './App.css'
import DropdownMenu from './components/user/user.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/prova' Component={DropdownMenu}/>
          <Route path="/login" Component={Login} />
          <Route path='/registration' Component={RegistrationForm} />
          <Route path="/home/:email" Component={Home} />
          <Route path='/lifecycle/:email' Component={LyfeCycle} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
