import { FaPlus } from 'react-icons/fa6';
import { useAuth } from '../SignIn/AuthContext'

export default function AddTreeButton({ onClick }) {
  const { user } = useAuth()
  return (
    <div className="add-tree-btn" onClick={onClick}>
      <FaPlus />
    </div>
  );
}