import { FaInfo } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';

export default function InfoButton({ isWelcomeVisible, onClick }) {

  return (
    <div 
      className={`cursor-pointer absolute inset-y-[20px] right-16 text-input bg-gray-100 rounded-full w-7 h-7 flex justify-center items-center text-input z-50 overflow-hidden drop-shadow-md`} 
      onClick={onClick}
    >
      <FaInfo size={17}/>
    </div>
  );
}

//   return (
//     <div 
//       className={`cursor-pointer absolute inset-y-[62px] right-3.5 ${isWelcomeVisible ? 'outline-primary text-primary':'outline-input text-input'} bg-white rounded-full w-10 h-10 flex justify-center items-center text-input outline outline-2 z-50 overflow-hidden drop-shadow-md`}
//       onClick={onClick}
//     >
//       <FaInfo size={18}/>
//     </div>
//   );
// }