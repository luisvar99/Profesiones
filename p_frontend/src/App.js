import Login from './Components/Auth/Login';
import {BrowserRouter, 
  Routes,
  Route} 
  from 'react-router-dom'
import {AuthProvider} from './Components/Context/AuthContext';
import Home from './Components/Home';
import NavBar from './Components/Common/NavBar';

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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
