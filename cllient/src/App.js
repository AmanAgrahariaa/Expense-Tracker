
import './App.css';
import HomePage from './pages/HomePage';
import './styles/HeaderStyle.css';
import './styles/LoginPage.css';
import './styles/RegisterPage.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/login';
import { Navigate } from 'react-router-dom';


function App() {
  return (
   <>
   
   <Router>
  <Routes>
    <Route path="/" element={<ProtectedRoutes>{<HomePage/>}</ProtectedRoutes>} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</Router>

  
   </>
  );
}


export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
      return props.children
  }
  else{
      return <Navigate to="/login"/>
  }
}


export default App;
