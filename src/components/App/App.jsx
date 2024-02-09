import { useState } from 'react';
import './App.css';
import AddTree from "../AddTree"
import EditTree from '../EditTree/EditTree';
import Auth from "../SignIn/Auth"
import Map from "../Map/Map"
import { useAuth } from '../SignIn/AuthContext';

function App() {
  const { isAuth } = useAuth();
  const [activeTree, setactiveTree] = useState(null);

  const makeActiveTree = (activeTree) => {
    setactiveTree(activeTree);
  }
  console.log('APP: Active tree is: ', activeTree);

  return (
    <div className="app-container">
      {isAuth ? 
        (<>
          
          {activeTree ? (
            <div className='edit-tree-container'>
              <EditTree 
              activeTree={activeTree} 
              />
            </div>
            ) : null}
          <div className='main-map-container'>
            <Map 
              makeActiveTree={makeActiveTree} 
              zoomSetting={15}
              mapCenter={[49.076,-117.8023979]} 
            />
          </div>
         </>
        ) :
        (
          <>
            <Auth />
          </>
        )}
    </div>
  );
}


export default App;
