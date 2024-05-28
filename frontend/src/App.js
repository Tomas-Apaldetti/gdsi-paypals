import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import { Login } from './pages/Authentication/Login';
import { Register } from 'pages/Authentication/Register';
import { NeedsAuth } from 'logic-components/NeedsAuth';
import { Logout } from 'pages/Authentication/Logout';
import { InviteLink } from 'pages/Invite/InviteLink';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <NeedsAuth redirect='/login'>
                <Home />
              </NeedsAuth>
            }
          />
          <Route
            path='/invite'
            element={
              <NeedsAuth redirect='/login'>
                <InviteLink />
              </NeedsAuth>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='*'
            element={
              <NeedsAuth redirect='/login'>
                <NotFound />
              </NeedsAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
