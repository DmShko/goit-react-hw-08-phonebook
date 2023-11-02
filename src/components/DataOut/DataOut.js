import { useDispatch, useSelector} from 'react-redux';
import { deluser } from 'phonebookStore/phoneBookSlice';
// import { deleteAPI } from '../../API/DeleteContact';

// add css modules
import o from './DataOut.module.css';
// import { getUserAPI } from '../../API/getUserAPI';

export const DataOut = ({ print }) => {

  const selector = useSelector(state => state.phonebook.filter);
  const dispatch = useDispatch();

  // chage data in App 'state' (delete user) 
  const deleteUser = evt => {
 
    // dispatch(deleteAPI(evt.target.name)); 
    dispatch(deluser(evt.target.name));
  };

  // out data in App 'state' if user name or number contain filter
  return print.name
    .toLowerCase()
    .includes(selector) ? (
    <li className={o.item}>
      <p>{print.name}</p>
      <button
        className={o.button}
        name={print.id}
        type="button"
        onClick={deleteUser}
      >
        Delete
      </button>
    </li>
  ) : (
    ''
  );
}