import { Route, Routes } from 'react-router-dom';
import Login from './components/account/Login';
import Signup from './components/account/Signup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
