import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense } from 'react';
import { useNavigate  } from "react-router-dom";


import sh from '../SharedLayout/SharedLayout.module.css';
import { Loader } from 'components/Loader/Loader';
import { outAPI } from '../../API/outUserAPI';
import { changestatusText } from '../../phonebookStore/logInSlice'
import HomeIcon from '../../images/couple-with-smartphones-talking-through-video-call/5226.jpg'
import { ReactComponent as LogOutIcon } from '../../images/logout.svg'

const SharedLayout = () => {

  const selectorToken = useSelector(state => state.logIn.token);
  const selectorStatusTextLogIn = useSelector(state => state.logIn.statusText);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOutUser = () => {
    
    if(selectorStatusTextLogIn === 'OK') {

      dispatch(changestatusText(''));
      dispatch(outAPI(selectorToken));
      navigate("/", { replace: true });
      
    }
  }

  return (
    <>
      <section className={sh.section}>
        <header className={sh.header}>
          <nav className={sh.nav}>
            <NavLink className={sh.link} to="/">
              Home
            </NavLink>
          {selectorStatusTextLogIn === 'OK' ? 
            <NavLink className={sh.link} to="/contacts">
              Contacts
            </NavLink>
          : ''}
          </nav>
         {selectorStatusTextLogIn !== 'OK' ? 
          <div className={sh.auth}>
              <NavLink className={sh.link} to="/register">
                SingUP
              </NavLink>

              <NavLink className={sh.link} to="/login">
                LogIn
              </NavLink>
              
          </div> 
            : <button className={sh.clipboard} onClick={logOutUser}>
                <LogOutIcon  width="55px" height="55px"/>
              </button>}
              
        </header>
        
      </section>

      <section className={sh.section}>
        <main>
          <Suspense fallback={<Loader/>}>
            <Outlet />
          </Suspense>
          <img src={HomeIcon} alt=""></img>
          <a style={{ fontSize: '18px' }} href="https://www.freepik.com/free-vector/couple-with-smartphones-talking-through-video-call_7732599.htm#page=2&query=illustrations%20contacts&position=1&from_view=search&track=ais">Image by pch.vector</a> on Freepik
        </main>
      </section>
    </>
  );
};

export default SharedLayout;
