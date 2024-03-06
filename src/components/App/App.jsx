import { useState } from 'react';
import { Toaster } from "../ui/toaster";
import './App.css';
import TreeInfo from '../TreeInfo/TreeInfo';
import SignIn from "../SignIn/SignIn"
import Map from "../Map/Map"
// import { useAuth } from '../SignIn/AuthContext';
import UserIcon from './UserIcon';
import AddTreeButton from './AddTreeButton'
import AddTreeNew from '../TreeInfo/AddTreeNew';

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
    // setIsAddTreeVisible(true)
    setActiveTree("new-tree")
  };
  const removeAddTree = () => {
    setIsAddTreeVisible(null);
  }

  const [activeTree, setActiveTree] = useState(null);
  const makeActiveTree = (activeTree) => {
    setActiveTree(activeTree);
  }
  const removeActiveTree = () => {
    setActiveTree(null);
  }
  console.log('APP: Active tree is: ', activeTree);

  const initialMapCenter = [49.076,-117.802]
  const [mapCenter, setMapCenter] = useState({ latitude: initialMapCenter[0], longitude: initialMapCenter[1] });

  return (
    <div className="app-container">
        <UserIcon onClick={(event) => showSignIn(event)} />
        <SignIn 
          isSignInVisible={isSignInVisible} 
          setIsSignInVisible={setIsSignInVisible} 
        />
        <AddTreeButton onClick={(event) => showAddTree(event)} />
        {/* <TreeInfo 
          activeTree={activeTree}
          removeActiveTree={removeActiveTree}
          isAddTreeVisible={isAddTreeVisible}
          removeAddTree={removeAddTree}
          mapCenter={mapCenter} 
        /> */}
        <div className='main-map-container' style={{position: 'relative', zIndex: '1'}}>
          <Map 
            mapSize='main'
            makeActiveTree={makeActiveTree} 
            activeTree={activeTree}
            zoomSetting={15}
            initialMapCenter={initialMapCenter} 
            setMapCenter={setMapCenter}
          />
        </div>
        <AddTreeNew 
          isAddTreeVisible={isAddTreeVisible}
          setIsAddTreeVisible={setIsAddTreeVisible}
          mapCenter={mapCenter}
        />
        {/* <Toaster /> */}
        {/* <Toaster className="z-3000" /> */}
    </div>
  );
}


export default App;
