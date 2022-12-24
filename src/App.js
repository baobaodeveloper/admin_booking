import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DarkmodeContext } from './context/Darkmode';

import Home from './pages/home/Home';
import ListHotel from './pages/list/ListHotel';
import ListRoom from './pages/list/ListRoom';
import ListUser from './pages/list/ListUser';
import Login from './pages/login/Login';
import NewHotel from './pages/new/NewHotel';
import NewRoom from './pages/new/NewRoom';
import NewUser from './pages/new/NewUser';
import SingleHotel from './pages/single/SingleHotel';
import SingleRoom from './pages/single/SingleRoom';
import SingleUser from './pages/single/SingleUser';

function App() {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className={darkMode ? 'app dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='user'>
              <Route index element={<ListUser />} />
              <Route
                path=':userId'
                element={<SingleUser name='user' />}
              />
              <Route path='new' element={<NewUser />} />
            </Route>
            <Route path='hotel'>
              <Route index element={<ListHotel />} />
              <Route
                path=':hotelId'
                element={<SingleHotel name='hotel' />}
              />
              <Route path='new' element={<NewHotel />} />
            </Route>
            <Route path='room'>
              <Route index element={<ListRoom />} />
              <Route
                path=':roomId'
                element={<SingleRoom name='room' />}
              />
              <Route path='new' element={<NewRoom />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
