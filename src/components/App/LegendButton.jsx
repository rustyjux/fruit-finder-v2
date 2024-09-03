import { PiListBulletsBold } from "react-icons/pi";

export default function LegendButton({ isLegendVisible, onClick }) {

  return (
    <div 
      className={`cursor-pointer absolute inset-y-[62px] left-3.5 ${isLegendVisible ? 'outline-primary text-primary':'outline-input text-input'} bg-white rounded-full w-10 h-10 flex justify-center items-center text-input outline outline-2 z-50 overflow-hidden drop-shadow-md`}
      onClick={onClick}
    >
      <PiListBulletsBold size={24}/>
    </div>
  );
}