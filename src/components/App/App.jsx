import { useState } from 'react';
import './App.css';
import AddTree from "../AddTree"
import EditTree from '../EditTree/EditTree';
import Auth from "../SignIn/Auth"
import Map from "../Map/Map"
import { useAuth } from '../SignIn/AuthContext';

function App() {
  const { isAuth } = useAuth();
  const [activeTreeId, setActiveTreeId] = useState("ACTIVE_TREE_ID");

  const makeActiveTree = (activeTree) => {
    setActiveTreeId(activeTree);
  }
  console.log(activeTreeId);

  return (
    <div className="app-container">
      {isAuth ? 
        (<>
          {/* <AddTree /> */}
          <EditTree 
          activeTreeId={activeTreeId} 
          />
          <Map makeActiveTree={makeActiveTree} />
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
