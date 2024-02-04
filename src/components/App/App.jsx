import './App.css';
import AddTree from "../AddTree"
import Auth from "../SignIn/Auth"
import Map from "../Map/Map"
import { useAuth } from '../SignIn/AuthContext';

function App() {
  const { isAuth } = useAuth();

  return (
    <div className="app-container">
      {isAuth ? 
        (<>
          <AddTree />
          <Map />
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
