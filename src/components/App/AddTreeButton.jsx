import { FaPlus } from 'react-icons/fa6';

export default function AddTreeButton({ activeTree, onClick }) {

  const bgColor = activeTree === 'new-tree' ? 'bg-hot' : 'bg-input';

  return (
    <div className={`cursor-pointer absolute bottom-3.5 right-3.5 ${bgColor} rounded-full w-16 h-16 flex justify-center items-center text-white z-50 overflow-hidden drop-shadow-md`}
    onClick={onClick}>
      <FaPlus size={30} />
    </div>
  );
}