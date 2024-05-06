import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NeedsAuth } from 'logic-components/NeedsAuth';

import Home from './pages/Home';
import Other from './pages/Other';
import { Login } from './pages/Authentication/Login';
import { Register } from './pages/Authentication/Register';
import { TicketCreate } from 'pages/Ticket/TicketCreate';

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
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/ticket/create' element={<TicketCreate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
