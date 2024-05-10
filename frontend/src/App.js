import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import { Login } from './pages/Authentication/Login';
import { Register } from 'pages/Authentication/Register';
import { NeedsAuth } from 'logic-components/NeedsAuth';
import GroupCreation from './pages/Groups/Creation';
import TicketCreate from './pages/Ticket/TicketCreate';
import { Logout } from 'pages/Authentication/Logout';
import { Test } from 'pages/Test';

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
            path='/group/create'
            element={
              <NeedsAuth redirect='/login'>
                <GroupCreation />
              </NeedsAuth>
            }
          />
          <Route
            path='/ticket/create'
            element={
              <NeedsAuth redirect='/login'>
                <TicketCreate />
              </NeedsAuth>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/test' element={<Test />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
