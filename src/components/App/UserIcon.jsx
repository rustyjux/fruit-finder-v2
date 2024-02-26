import { FaUserCheck, FaUserPlus } from 'react-icons/fa6';
import { useAuth } from '../SignIn/AuthContext'

export default function UserIcon({ onClick }) {
  const { user } = useAuth()
  return (
    <div className="user-icon" onClick={onClick}>
        {user ? 
          (user.photoURL ? <img src={user.photoURL} className="user-image" referrerPolicy="no-referrer"/> 
          : <FaUserCheck />)
        : <FaUserPlus />}
    </div>
  );
}