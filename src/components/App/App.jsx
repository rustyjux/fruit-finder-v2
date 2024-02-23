import { useState } from 'react';
import './App.css';
import AddTree from "../AddTree"
import EditTree from '../EditTree/EditTree';
import SignIn from "../SignIn/SignIn"
import Map from "../Map/Map"
// import { useAuth } from '../SignIn/AuthContext';
import UserIcon from '../UserIcon/UserIcon';

function App() {
  // const { isAuth } = useAuth();
  const [isSignInVisible, setIsSignInVisible] = useState(true);
  const showSignIn = (event) => {
    event.stopPropagation()
    setIsSignInVisible((prevIsSignInVisible) => !prevIsSignInVisible);
  };

  const [activeTree, setactiveTree] = useState(null);

  const makeActiveTree = (activeTree) => {
    setactiveTree(activeTree);
  }
  console.log('APP: Active tree is: ', activeTree);

  return (
    <div className="app-container">
        <>
          {activeTree ? (
              <EditTree 
                activeTree={activeTree} 
              />
            ) : null}
          <div className='main-map-container' style={{position: 'relative', zIndex: '1'}}>
            <Map 
              makeActiveTree={makeActiveTree} 
              zoomSetting={15}
              mapCenter={[49.076,-117.8023979]} 
            />
            <UserIcon onClick={(event) => showSignIn(event)} />
            <SignIn 
              isSignInVisible={isSignInVisible} 
              setIsSignInVisible={setIsSignInVisible} 
            />
          </div>
         </>
    </div>
  );
}


export default App;
