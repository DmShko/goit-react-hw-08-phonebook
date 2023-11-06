
import { Route, Routes } from 'react-router-dom';

// import { useDispatch } from 'react-redux';
// import Notiflix from 'notiflix';

import LogIn  from 'pages/Login/LogIn';
import SingUp from 'pages/SingUp/SingUp';
import { PhoneBookSection } from 'pages/PhoneBookSection/PhoneBookSection';
import NotFound from 'pages/NptFound/NotFound';
import SharedLayout from './components/SharedLayout/SharedLayout';
import Home from 'pages/Home/Home';

import { nanoid } from 'nanoid';

// path consts
  const REGISTER = '/register';
  const LOGIN = '/login';
  const CONTACTS = '/contacts';
  const NOTFOUND = '/*';

export const App = () => {
  // Routes
  const appRoutes = [
    {path: REGISTER, element: <SingUp />,},
    {path: LOGIN, element: <LogIn />,},
    {path: CONTACTS, element: <PhoneBookSection />,},
    {path: NOTFOUND, element: <NotFound />,}
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index
            element={<Home/>}
          />

          {appRoutes.map(({ path, element }) => 
          {return <Route key={nanoid()} path={path} element={element}/>})}

        </Route>
      </Routes>
    </>
  );
}
