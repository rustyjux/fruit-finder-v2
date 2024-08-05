import { FaPlus } from 'react-icons/fa6';

export default function AddTreeButton({ activeTree, onClick }) {

  const newTree = activeTree === 'new-tree' ? true : false;

  return (
    <div className={`cursor-pointer absolute bottom-3.5 right-3.5 outline outline-3 ${newTree ? 'outline-primary text-primary':'outline-input text-input'} bg-white rounded-full w-16 h-16 flex justify-center items-center z-50 overflow-hidden drop-shadow-md`}
    onClick={onClick}>
      <FaPlus size={30} />
    </div>
  );
}