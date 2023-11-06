import { useEffect,} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense } from 'react';
import { useNavigate  } from "react-router-dom";


import sh from '../SharedLayout/SharedLayout.module.css';
import { Loader } from 'components/Loader/Loader';

import { changestatusText } from '../../phonebookStore/logInSlice'
import HomeIcon from '../../images/couple-with-smartphones-talking-through-video-call/5226.jpg'
import { ReactComponent as LogOutIcon } from '../../images/logout.svg'
import { ReactComponent as LogUser } from '../../images/user-svgrepo-com.svg'
import { clear } from 'phonebookStore/logInSlice'
import { clearContact } from '../../phonebookStore/phoneBookSlice'

import { outAPI } from '../../API/outUserAPI';
import { currentUser } from '../../API/currentUserAPI';

import { changeVisibility } from '../../phonebookStore/phoneBookSlice'

const SharedLayout = () => {

  const selectorToken = useSelector(state => state.logIn.token);
  const selectorUser = useSelector(state => state.currentUser.userData);
  const visibility = useSelector(state => state.phonebook.visibility);
  const selectorStatusTextLogIn = useSelector(state => state.logIn.statusText);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    
    

    const handleWindowResize = () => {
      if(window.innerWidth < 768) {
        dispatch(changeVisibility(true));
      } else {
        dispatch(changeVisibility(false));
      };
      
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    // eslint-disable-next-line
  },[window.offWidth])

  useEffect(() => {
    
    if(selectorStatusTextLogIn === 'OK') dispatch(currentUser(selectorToken));
    // eslint-disable-next-line
  },[selectorStatusTextLogIn])

  const logOutUser = () => {
    
    if(selectorStatusTextLogIn === 'OK') {

      dispatch(changestatusText(''));
      
      // exit and clear localStorage
      dispatch(outAPI(selectorToken)).then(response =>{
         dispatch(clear({token:'', statusText: ''}))
        localStorage.removeItem("persist:root") 
        dispatch(clearContact([]))
      });
      
     
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
            : 
            !visibility ? 
            
              <div className={sh.userAndOut}>

                <div className={sh.userData}>
                  <LogUser style={{fill: 'white'}} width="30px" height="30px"/> 
                  <p style={{margin: 0, color: 'blue', padding: '3px'}}>{selectorUser}</p>
                </div>
                <button className={sh.clipboard} onClick={logOutUser}>
                  <LogOutIcon  width="55px" height="55px"/>
                </button> 

              </div>:  
              <button className={sh.clipboard} onClick={logOutUser}>
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
          <div className={sh.about}>
            <a style={{ fontSize: '18px' }} href="https://www.freepik.com/free-vector/couple-with-smartphones-talking-through-video-call_7732599.htm#page=2&query=illustrations%20contacts&position=1&from_view=search&track=ais">Image by pch.vector</a> on Freepik
            <p style={{ textAlign: 'center' }}> Developed by Dmytro Shevchenko <a href="https://github.com/DmShko"> GitHub </a></p>
          </div>
          
        </main>
      </section>
    </>
  );
};

export default SharedLayout;
