import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Other from './pages/Other';
import { Login } from './pages/Authentication/Login';

function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/other' element={<Other />} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
