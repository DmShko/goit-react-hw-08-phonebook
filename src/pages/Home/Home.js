import home from '../Home/Home.module.css';

const Home = () => {

  return (
    <div style={{display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 fontSize: '24px' }}>
      <h1 style={{display: 'flex',
                 justifyContent: 'center',
                 textAlign: 'center',
                 fontSize: '50px',
                 width: '70%',
                  }}> Welcom! It's a comfortable phonebook.</h1>

      <p className={home.title}>Please login or register to use</p>
      
    </div>
  )
}

export default Home;
