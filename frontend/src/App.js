import { Route, Routes } from 'react-router-dom';
import Login from './components/account/Login';
import Signup from './components/account/Signup';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </DataProvider>

  );
}

export default App;
