import './App.css';
import AddTree from "./components/AddTree"
import Auth from "./components/Auth"
import Map from "./components/Map"
import { useAuth } from './components/AuthContext';

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
