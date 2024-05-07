import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NeedsAuth } from 'logic-components/NeedsAuth';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Login } from './pages/Authentication/Login';
import { Register } from 'pages/Authentication/Register';
import { NeedsAuth } from 'logic-components/NeedsAuth';
import GroupCreation from './pages/Groups/Creation';

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
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register />}/>
            <Route path='/group/create' element={<GroupCreation />}/>
            <Route path='*' element={<NotFound />}/>
            <Route path='/ticket/create' element={<TicketCreate />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
