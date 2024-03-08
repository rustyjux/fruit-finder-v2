import { FaPlus } from 'react-icons/fa6';
import { useAuth } from '../SignIn/AuthContext'

export default function AddTreeButton({ onClick }) {
  const { user } = useAuth()
  return (
    <div className="cursor-pointer absolute inset-y-16 left-3.5 bg-primary rounded-full w-10 h-10 flex justify-center items-center text-white z-50 overflow-hidden drop-shadow-md"
    onClick={onClick}>
      <FaPlus />
    </div>
  );
}