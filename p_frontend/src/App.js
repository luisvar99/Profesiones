import Login from './Components/Auth/Login';
import {BrowserRouter, 
  Routes,
  Route} 
  from 'react-router-dom'
import {AuthProvider} from './Components/Context/AuthContext';
import Home from './Components/Home';
import NavBar from './Components/Common/NavBar';
import Panel from './Components/Admin/Panel';
import ManageProfessions from './Components/Admin/Profesions/ManageProfessions';
import React, { useEffect, useState } from 'react'
import ManageUsers from './Components/Admin/Users/ManageUsers';
import ManageWorkers from './Components/Admin/Workers/ManageWorkers';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" exact element={<Login/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Home" exact element={<Home/>}/>      
          </Routes> 
          <Routes>
            <Route path="/AdminPanel" exact element={<Panel/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Admin/ManageProfessions" exact element={<ManageProfessions/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Admin/ManageUsers" exact element={<ManageUsers/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Admin/ManageWorkers" exact element={<ManageWorkers/>}/>      
          </Routes> 
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
