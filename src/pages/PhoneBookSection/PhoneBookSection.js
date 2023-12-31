import { useEffect } from 'react';

// get components link from 'components' directory
import { DataIn } from "components/DataIn/DataIn"
import { DataOut } from "components/DataOut/DataOut"
import { FindContacts } from '../../components/FindContacts/FindContacts';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from 'components/Loader/Loader';
import Notiflix from 'notiflix';

import { getUser } from '../../API/getUserAPI';

// add css modules
import phoneSec from './PhoneBookSection.module.css';
import { ReactComponent as LogUser } from '../../images/user-svgrepo-com.svg'

    // <DataIn> - this component performs save input data and validation.
    // here change THIS state and main state in App.
    // <FindContacts - this component change 'filter' property in App 'state'
    // this value use in <Dataout> component for out users
export const PhoneBookSection = () => {

  const selectorToken = useSelector(state => state.logIn.token);
  const selectorItems = useSelector(state => state.phonebook.items);
  const loadState = useSelector(state => state.phonebook.isLoading);
  // const selectorError = useSelector(state => state.phonebook.error);
  const selectorstatusText = useSelector(state => state.logIn.statusText);
  const selectorStatusTextLogIn = useSelector(state => state.logIn.statusText);
  const visibility = useSelector(state => state.phonebook.visibility);
  const selectorUser = useSelector(state => state.currentUser.userData);

  
  const dispatch = useDispatch();

  useEffect(() => {

    if(selectorstatusText === 'OK') {
     
      dispatch(getUser(selectorToken));
    } else {
      Notiflix.Notify.info('You need to log in!', {position: 'center-top', fontSize: '24px',});
    };

    // eslint-disable-next-line
  },[])

  return (

    <div className={phoneSec.section}>

    { selectorStatusTextLogIn === 'OK' &&  visibility ? 
            
            <div className={phoneSec.userAndOut}>

              <div className={phoneSec.userData}>
                <LogUser style={{fill: 'white'}} width="30px" height="30px"/> 
                <p style={{ fontSize: '24px', margin: 0, color: 'blue', padding: '3px'}}>{selectorUser}</p>
              </div>
            
            </div>: ''} 

      <DataIn/>

      <p style={{fontSize: '20px'}}>Contacts</p>
      <FindContacts/>
      {loadState && <Loader/>}
      {!loadState && selectorItems.length === 0 ? <p className={phoneSec.message}>Phonebook is empty...</p>: ''}
      <ul className={phoneSec.list}>
        {selectorItems !== undefined ? selectorItems.map(result => {
          return (
            <DataOut
              key={result.id}
              print={result}
            />
          );
        }): ''}
       </ul>
       
    </div>
    
  )
}
