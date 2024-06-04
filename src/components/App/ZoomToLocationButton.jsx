import { FaLocationCrosshairs } from 'react-icons/fa6';

export default function ZoomToLocationButton({ customStyle, zoomToLocationRequest, setZoomToLocationRequest }) {

  const classNames = customStyle === "mainStyle" 
    ? `cursor-pointer absolute inset-y-[158px] left-3.5 ${zoomToLocationRequest ? 'outline-primary text-primary':'outline-black text-input'} bg-white rounded-full w-10 h-10 flex justify-center items-center z-50 overflow-hidden outline outline-2 drop-shadow-md`
    : `outline outline-2 ${zoomToLocationRequest ? 'outline-primary text-primary':'outline-black text-black'} rounded-md w-6 h-6 flex cursor-pointer justify-center items-center inline-flex align-middle ml-1.5`

  const iconSize = customStyle === "mainStyle" ? 20 : 17

  return (
    <div 
      className={classNames}
      onClick={(event) => setZoomToLocationRequest(true)} 
    >
      <FaLocationCrosshairs size={iconSize} />
    </div>
  );
}