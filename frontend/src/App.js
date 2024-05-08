import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Login } from './pages/Authentication/Login';
import { Register } from 'pages/Authentication/Register';
import { NeedsAuth } from 'logic-components/NeedsAuth';
import GroupCreation from './pages/Groups/Creation';
import TicketCreate from './pages/Ticket/TicketCreate';

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
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
