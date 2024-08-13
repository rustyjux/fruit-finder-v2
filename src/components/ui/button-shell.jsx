export default function ButtonShell({ icon: Icon }) {

  return (
    <div 
      className={'outline-input text-input bg-white rounded-full w-10 h-10 flex justify-center items-center text-input outline outline-2 overflow-hidden drop-shadow-md'}
    >
      <Icon size={18}/>
    </div>
  );
}