import { FaPlus } from 'react-icons/fa6';

export default function AddTreeButton({ activeTree, onClick }) {

  const bgColor = activeTree === 'new-tree' ? 'bg-hot' : 'bg-input';

  return (
    <div className={`cursor-pointer absolute inset-y-[110px] left-3.5 ${bgColor} rounded-full w-10 h-10 flex justify-center items-center text-white z-50 overflow-hidden drop-shadow-md`}
    onClick={onClick}>
      <FaPlus size={20} />
    </div>
  );
}