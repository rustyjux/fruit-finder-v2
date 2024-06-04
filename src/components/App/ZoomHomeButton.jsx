import { FaHome } from 'react-icons/fa';

export default function ZoomHomeButton({ zoomToLocationRequest, setZoomToLocationRequest }) {


  const iconSize = 20

  return (
    <div 
      className={`cursor-pointer absolute inset-y-[110px] left-3.5 bg-white rounded-full w-10 h-10 flex justify-center items-center text-input outline outline-input outline-2 z-50 overflow-hidden drop-shadow-md`}
      onClick={(event) => setZoomToLocationRequest(true)} 
    >
      <FaHome size={iconSize} />
    </div>
  );
}