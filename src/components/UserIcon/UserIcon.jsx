import './UserIcon.css';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../SignIn/AuthContext'


export default function UserIcon() {
    const { user } = useAuth()
//   console.log(user)
  return (
    <div className="user-icon">
        {user ? (<img src={user.photoURL} />) : <FaUser />}
    </div>
  );
}