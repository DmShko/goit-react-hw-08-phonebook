import { useEffect } from 'react';

// get components link from 'components' directory
import { DataIn } from "components/DataIn/DataIn"
import { DataOut } from "components/DataOut/DataOut"
import { FindContacts } from '../../components/FindContacts/FindContacts';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from 'components/Loader/Loader';
import Notiflix from 'notiflix';

import { getUserAPI } from '../../API/getUserAPI';

// add css modules
import phoneSec from './PhoneBookSection.module.css';

    // <DataIn> - this component performs save input data and validation.
    // here change THIS state and main state in App.
    // <FindContacts - this component change 'filter' property in App 'state'
    // this value use in <Dataout> component for out users
export const PhoneBookSection = () => {

  const selectorToken = useSelector(state => state.logIn.token);
  const selectorItems = useSelector(state => state.phonebook.items);
  const loadState = useSelector(state => state.phonebook.isLoading);
  const selectorError = useSelector(state => state.phonebook.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAPI(selectorToken));
    // eslint-disable-next-line
  },[dispatch])

  useEffect(() => {
    if (selectorError !== null) Notiflix.Notify.warning(`${selectorError}`, {position: 'center-top', fontSize: '24px',});
  },[selectorError])

  return (

    <div className={phoneSec.section}>
      <DataIn/>

      <p>Contacts</p>
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
