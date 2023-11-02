
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';

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

  const appRoutes = [
    {path: REGISTER, element: <SingUp />,},
    {path: LOGIN, element: <LogIn />,},
    {path: CONTACTS, element: <PhoneBookSection />,},
    {path: NOTFOUND, element: <NotFound />,}
  ];

  const dispatch = useDispatch();
  // const selector = useSelector(state => state.singUp.error);

  // useEffect(() => {
  //   dispatch(getAPI());
  // },[dispatch])

  // useEffect(() => {
  //   if (selector !== null) Notiflix.Notify.warning(`${selector}`, {position: 'center-top', fontSize: '24px',});
  // },[selector])

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
