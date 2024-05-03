import { FaLayerGroup } from 'react-icons/fa';

export default function LegendButton({ isLegendVisible, onClick }) {

  const bgColor = isLegendVisible ? 'bg-hot' : 'bg-input';

  return (
    <div 
      className={`cursor-pointer absolute inset-y-[62px] left-3.5 ${bgColor} rounded-full w-10 h-10 flex justify-center items-center text-white z-50 overflow-hidden drop-shadow-md`}
      onClick={onClick}
    >
      <FaLayerGroup />
    </div>
  );
}