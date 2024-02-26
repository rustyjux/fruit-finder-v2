import { useState } from 'react';
import './App.css';
import TreeInfo from '../TreeInfo/TreeInfo';
import SignIn from "../SignIn/SignIn"
import Map from "../Map/Map"
// import { useAuth } from '../SignIn/AuthContext';
import UserIcon from './UserIcon';
import AddTreeButton from './AddTreeButton'

function App() {
  // const { isAuth } = useAuth();
  const [isSignInVisible, setIsSignInVisible] = useState(true);
  const showSignIn = (event) => {
    event.stopPropagation()
    setIsSignInVisible((prevIsSignInVisible) => !prevIsSignInVisible);
  };
 
  const [isAddTreeVisible, setIsAddTreeVisible] = useState(false);
  const showAddTree = (event) => {
    event.stopPropagation()
    setIsAddTreeVisible((prevIsAddTreeVisible) => !prevIsAddTreeVisible);
  };

  const [activeTree, setActiveTree] = useState(null);
  const makeActiveTree = (activeTree) => {
    setActiveTree(activeTree);
  }
  const removeActiveTree = () => {
    setActiveTree(null);
  }
  console.log('APP: Active tree is: ', activeTree);

  const [mapCenter, setMapCenter] = useState({ latitude: 0, longitude: 0 });

  return (
    <div className="app-container">
        <UserIcon onClick={(event) => showSignIn(event)} />
        <SignIn 
          isSignInVisible={isSignInVisible} 
          setIsSignInVisible={setIsSignInVisible} 
        />
        <AddTreeButton onClick={(event) => showAddTree(event)} />
        <TreeInfo 
          activeTree={activeTree}
          removeActiveTree={removeActiveTree}
          isAddTreeVisible={isAddTreeVisible}
          mapCenter={mapCenter} 
        />
        <div className='main-map-container' style={{position: 'relative', zIndex: '1'}}>
          <Map 
            mapSize='main'
            makeActiveTree={makeActiveTree} 
            activeTree={activeTree}
            zoomSetting={15}
            initialMapCenter={[49.076,-117.8023979]} 
            setMapCenter={setMapCenter}
          />
        </div>
    </div>
  );
}


export default App;
