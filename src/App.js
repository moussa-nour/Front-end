
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
  <Menu/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
  </Routes>
    </div>
  );
}

export default App;
