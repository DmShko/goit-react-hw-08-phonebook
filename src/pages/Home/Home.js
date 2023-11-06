import { useSelector } from 'react-redux';

import home from '../Home/Home.module.css';

const Home = () => {
  
  const selectorLogInStatus = useSelector(state => state.logIn.statusText);

  return (
    <div style={{display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 fontSize: '24px' }}>
      <h1 style={{display: 'flex',
                 justifyContent: 'center',
                 textAlign: 'center',
                 fontSize: '45px',
                 width: '70%',
                  }}> Welcom! It's a comfortable phonebook.</h1>

      {selectorLogInStatus === 'OK' ? <p className={home.title}>Pleasant use.</p> : <p className={home.title}>Please login or register to use.</p>}
      
    </div>
  )
}

export default Home;
