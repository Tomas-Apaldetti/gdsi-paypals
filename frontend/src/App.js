import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Other from './pages/Other';
import { Login } from './pages/Authentication/Login';
import { Register } from 'pages/Authentication/Register';
import { NeedsAuth } from 'logic-components/NeedsAuth';

function App() {
  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <NeedsAuth redirect='/login'>
                <Home />
              </NeedsAuth>
            } />
            <Route path='/other' element={
              <NeedsAuth redirect='/login'>
                <Other />
              </NeedsAuth>
            }/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
