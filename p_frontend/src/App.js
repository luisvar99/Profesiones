import Login from './Components/Auth/Login';
import {BrowserRouter, 
  Routes,
  Route} 
  from 'react-router-dom'
import {AuthProvider} from './Components/Context/AuthContext';
import Home from './Components/Common/Home';
import NavBar from './Components/Common/NavBar';
import Panel from './Components/Admin/Panel';
import ManageProfessions from './Components/Admin/Profesions/ManageProfessions';
import React, { useEffect, useState } from 'react'
import ManageUsers from './Components/Admin/Users/ManageUsers';
import ManageWorkers from './Components/Admin/Workers/ManageWorkers';
import WorkerDetails from './Components/Workers/WorkerDetails';
import SignUp from './Components/Auth/SignUp';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" exact element={<Login/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Home" element={<Home/>}/>      
          </Routes> 
          <Routes>
            <Route path="/AdminPanel" element={<Panel/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Admin/ManageProfessions" element={<ManageProfessions/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Admin/ManageUsers" element={<ManageUsers/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Admin/ManageWorkers" element={<ManageWorkers/>}/>      
          </Routes> 
          <Routes>
            <Route path="/Worker/:id_user/:id_profesion" element={<WorkerDetails/>}/>      
          </Routes> 
          <Routes>
            <Route path="/SignUp" element={<SignUp/>}/>      
          </Routes> 
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
