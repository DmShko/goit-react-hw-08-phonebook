import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense } from 'react';
import { Navigate } from "react-router-dom";

import sh from '../SharedLayout/SharedLayout.module.css';
import { Loader } from 'components/Loader/Loader';
import { outAPI } from '../../API/outUserAPI';

const SharedLayout = () => {

  const selectorToken = useSelector(state => state.logIn.token);

  const dispatch = useDispatch();

  const logOutUser = () => {
     
    dispatch(outAPI(selectorToken));
    <Navigate to="/" replace />;
    
  }

  return (
    <>
      <section className={sh.section}>
        <header className={sh.header}>
          <nav className={sh.nav}>
            <NavLink className={sh.link} to="/">
              Home
            </NavLink>
            
            <NavLink className={sh.link} to="/contacts">
              Contacts
            </NavLink>
          </nav>
          <div className={sh.auth}>
            <NavLink className={sh.link} to="/register">
              SingUP
            </NavLink>

            <NavLink className={sh.link} to="/login">
              LogIn
            </NavLink>
            <button onClick={logOutUser}> LogOut </button>
          </div>
            
        </header>

      </section>

      <section className={sh.section}>
        <main>
          <Suspense fallback={<Loader/>}>
            <Outlet />
          </Suspense>
        </main>
      </section>
    </>
  );
};

export default SharedLayout;
