import { useState, useEffect } from 'react';
import { Toaster } from "../ui/toaster";
import { Button } from "@/components/ui/button"
import './App.css';
import SignIn from "../SignIn/SignIn"
import Welcome from '../Info/Welcome';
import Map from "../Map/Map"
// import { useAuth } from '../SignIn/AuthContext';
import UserIcon from './UserIcon';
import AddTreeButton from './AddTreeButton'
import AddTree from '../TreeInfo/AddTree';
import ViewEditTree from '../TreeInfo/ViewEditTree';
import Legend from '../Legend/Legend';
import { treeTypes } from "@/utils/displayText";
import { accessMap } from "@/utils/displayText";
import LegendButton from './LegendButton';
import ZoomToLocationButton from './ZoomToLocationButton';

function App() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);

  // const { isAuth } = useAuth();
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const showSignIn = (event) => {
    event.stopPropagation()
    setIsSignInVisible((prevIsSignInVisible) => !prevIsSignInVisible);
  };
 
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  const toggleLegendVisible = () => {
    setIsLegendVisible(!isLegendVisible);
  };

  const [selectedFilters, setSelectedFilters] = useState({
    treeTypes: Object.fromEntries(
      Object.entries(treeTypes).map(([key]) => [key, true])
    ),
    access: Object.fromEntries(
      Object.entries(accessMap).map(([key]) => [key, true])
    ),
    ripe: {'ripeOnly':false}
  });

  const resetFilters = {
      treeTypes: Object.fromEntries(
        Object.entries(treeTypes).map(([key]) => [key, true])
      ),
      access: Object.fromEntries(
        Object.entries(accessMap).map(([key]) => [key, true])
      ),
      ripe: {'ripeOnly':false}
    }

  useEffect(() => {
    const storedFilters = localStorage.getItem('selectedFilters');
    if (storedFilters) {
      try {
        const parsedFilters = JSON.parse(storedFilters);
        setSelectedFilters(parsedFilters);
      } catch (error) {
        console.error('Error parsing stored selectedFilters:', error);
      }
    }
  }, []);

  const handleSelectedFiltersChange = (updatedFilters) => {
    setSelectedFilters(updatedFilters);
    localStorage.setItem('selectedFilters', JSON.stringify(updatedFilters));
  };

  const [isAddTreeVisible, setIsAddTreeVisible] = useState(false);
  const [addTreeEnded, setAddTreeEnded] = useState('initial');
  const showAddTree = () => {
    // on/off/off functionality
    // setIsAddTreeVisible((prevIsAddTreeVisible) => !prevIsAddTreeVisible);
    
    // on/off
    if (!isAddTreeVisible){setIsAddTreeVisible(true)}
    
    setActiveTree("new-tree")
    if (addTreeEnded === true || addTreeEnded === 'initial') {
      setDraggablePosition(mapCenter);
    }
    setAddTreeEnded(false)

    if (isAddTreeVisible){endAddTree()}
  };
  const endAddTree = () => {
    setIsAddTreeVisible(false);
    setActiveTree(null)
    setAddTreeEnded(true)
  }
  const endEditPosition = () => {
      setEditPosition(false)
      removeActiveTree()
  }
  
  const [isViewEditVisible, setIsViewEditVisible] = useState(false);
  const [activeTree, setActiveTree] = useState(null);
  const [editPosition, setEditPosition] = useState(false);

  // Use for setting active tree from Map/TreeMarker
  const makeActiveTree = (activeTreeToBe) => {
    if (activeTree != 'new-tree' && !editPosition){
      setIsViewEditVisible(true)
      setActiveTree(activeTreeToBe);
    } 
  }
  
  const removeActiveTree = () => {
    setActiveTree(null);
  }

  function handleRemoveActiveTreeWithDelay() {
    setTimeout(() => {
        removeActiveTree();
    }, 150); 
  }

  useEffect(() => {
    if (!isViewEditVisible && activeTree != 'new-tree') {
      handleRemoveActiveTreeWithDelay();
    }
  }, [isViewEditVisible]);

  const initialMapCenter = [49.076,-117.802]
  const [mapCenter, setMapCenter] = useState({ lat: initialMapCenter[0], lng: initialMapCenter[1] });

  const [draggablePosition, setDraggablePosition] = useState(mapCenter)

  const [zoomToLocationRequest, setZoomToLocationRequest] = useState(false)

  return (
    <div className="app-container">
        <Welcome isWelcomeVisible={isWelcomeVisible} setIsWelcomeVisible={setIsWelcomeVisible} />
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
            editPosition={editPosition}
            selectedFilters={selectedFilters}
            zoomToLocationRequest={zoomToLocationRequest}
            setZoomToLocationRequest={setZoomToLocationRequest}
          />
        </div>
        <LegendButton
          isLegendVisible={isLegendVisible}
          onClick={toggleLegendVisible}
        />
        {isLegendVisible && 
          <Legend
            onSelectedFiltersChange={handleSelectedFiltersChange}
            appSelectedFilters={selectedFilters}
            resetFilters={resetFilters}
            isLegendVisible={isLegendVisible}
            setIsLegendVisible={setIsLegendVisible}
          />
        }
        {activeTree && activeTree!=='new-tree' && (
          <ViewEditTree 
            activeTree={activeTree}
            removeActiveTree={removeActiveTree}
            isViewEditVisible={isViewEditVisible}
            setIsViewEditVisible={setIsViewEditVisible}
            draggablePosition={draggablePosition}
            setDraggablePosition={setDraggablePosition}
            setEditPosition={setEditPosition}
            endEditPosition={endEditPosition}
            zoomToLocationRequest={zoomToLocationRequest}
            setZoomToLocationRequest={setZoomToLocationRequest}
          />
        )}
        <AddTreeButton 
          activeTree={activeTree} 
          onClick={(event) => showAddTree(event)} 
        />
        {activeTree && activeTree=='new-tree' && (
        <AddTree 
          isAddTreeVisible={isAddTreeVisible}
          setIsAddTreeVisible={setIsAddTreeVisible}
          draggablePosition={draggablePosition}
          setDraggablePosition={setDraggablePosition}
          endAddTree={endAddTree}
          zoomToLocationRequest={zoomToLocationRequest}
          setZoomToLocationRequest={setZoomToLocationRequest}
        />
        )}
        <ZoomToLocationButton 
          customStyle="mainStyle"
          zoomToLocationRequest={zoomToLocationRequest}
          setZoomToLocationRequest={setZoomToLocationRequest}
        />
        <Toaster />
    </div>
  );
}


export default App;
