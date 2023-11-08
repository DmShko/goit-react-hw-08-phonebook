import { useSelector } from 'react-redux';

import home from '../Home/Home.module.css';
import { ReactComponent as LogUser } from '../../images/user-svgrepo-com.svg'

const Home = () => {
  
  const selectorLogInStatus = useSelector(state => state.logIn.statusText);
  const visibility = useSelector(state => state.phonebook.visibility);
  const selectorStatusTextLogIn = useSelector(state => state.logIn.statusText);
  const selectorUser = useSelector(state => state.currentUser.userData);

  return (
    <div style={{display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 fontSize: '24px' }}>


      { selectorStatusTextLogIn === 'OK' &&  visibility ? 
            
            <div className={home.userAndOut}>

              <div className={home.userData}>
                <LogUser style={{fill: 'white'}} width="30px" height="30px"/> 
                <p style={{margin: 0, color: 'blue', padding: '3px'}}>{selectorUser}</p>
              </div>
            
            </div>: ''} 
            
      <h1 style={{display: 'flex',
                 justifyContent: 'center',
                 textAlign: 'center',
                 fontSize: '45px',
                 width: '70%',
                  }}> Welcome! It's a comfortable phonebook.</h1>       

      {selectorLogInStatus === 'OK' ? <p className={home.title}>Pleasant use.</p> : <p className={home.title}>Please login or register to use.</p>}
      
    </div>
  )
}

export default Home;
