import { useParams, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import MainContent from './MainContent';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/trees/:treeId" element={<MainContent />} />
        <Route path="/" 
          element={<MainContent />}
          // element={<Navigate to="/trees/default" replace/>} 
        />
      </Routes>
    </div>
  );
}

export default App;