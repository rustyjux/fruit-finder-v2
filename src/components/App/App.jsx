import { useState, useEffect } from 'react';
import { Toaster } from "../ui/toaster";
import './App.css';
import TreeInfo from '../TreeInfo/TreeInfo';
import SignIn from "../SignIn/SignIn"
import Map from "../Map/Map"
// import { useAuth } from '../SignIn/AuthContext';
import UserIcon from './UserIcon';
import AddTreeButton from './AddTreeButton'
import AddTree from '../TreeInfo/AddTree';
import ViewEditTree from '../TreeInfo/ViewEditTree';

function App() {
  // const { isAuth } = useAuth();
  const [isSignInVisible, setIsSignInVisible] = useState(false);
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
  const cancelAddTree = () => {
    setIsAddTreeVisible(null);
    setActiveTree(null)
  }

  const [isViewEditVisible, setIsViewEditVisible] = useState(false);

  const [activeTree, setActiveTree] = useState(null);
  // Use for setting active tree from Map/TreeMarker
  const makeActiveTree = (activeTree) => {
    setIsViewEditVisible(true)
    setActiveTree(activeTree);
  }
  const removeActiveTree = () => {
    setActiveTree(null);
  }

  useEffect(() => {
    if (!isViewEditVisible) {
      removeActiveTree();
    }
  }, [isViewEditVisible]);

  const initialMapCenter = [49.076,-117.802]
  const [mapCenter, setMapCenter] = useState({ lat: initialMapCenter[0], lng: initialMapCenter[1] });

  const [draggablePosition, setDraggablePosition] = useState(mapCenter)

  return (
    <div className="app-container">
        <UserIcon onClick={(event) => showSignIn(event)} />
        <SignIn 
          isSignInVisible={isSignInVisible} 
          setIsSignInVisible={setIsSignInVisible} 
        />
        <div className='main-map-container' style={{position: 'relative', zIndex: '1'}}>
          <Map 
            mapSize='main'
            makeActiveTree={makeActiveTree} 
            activeTree={activeTree}
            zoomSetting={15}
            initialMapCenter={initialMapCenter} 
            setMapCenter={setMapCenter}
            draggablePosition={draggablePosition}
            setDraggablePosition={setDraggablePosition}
          />
        </div>
        {activeTree && activeTree!=='new-tree' && (
          <ViewEditTree 
            activeTree={activeTree}
            removeActiveTree={removeActiveTree}
            isViewEditVisible={isViewEditVisible}
            setIsViewEditVisible={setIsViewEditVisible}
          />
        )}
        <AddTreeButton onClick={(event) => showAddTree(event)} />
        <AddTree 
          isAddTreeVisible={isAddTreeVisible}
          setIsAddTreeVisible={setIsAddTreeVisible}
          draggablePosition={draggablePosition}
        />
        <Toaster />
        {/* <Toaster className="z-3000" /> */}
    </div>
  );
}


export default App;
