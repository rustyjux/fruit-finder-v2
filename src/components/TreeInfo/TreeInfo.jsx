import { useState, useRef, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";
import Map from "../Map/Map";
import { toTitleCase } from "../../helpers";
import './TreeInfo.css'

export default function TreeInfo({ activeTree, removeActiveTree }) {
    const ref = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => 
      {
        if (ref.current && !ref.current.contains(event.target)) {
          removeActiveTree(); // Hide the sign-in container
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, [activeTree, removeActiveTree]);

    console.log('TreeInfo: Active tree is: ', activeTree);
    const [newTree, setNewTree] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const treeInputRef = useRef(null);
    
    const treesCollectionRef = collection(db, "trees");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTree === "" || latitude === "" || longitude === "") return;

        await addDoc(treesCollectionRef, {
            description: newTree,
            location: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            },
            createdAt: serverTimestamp(),
            userDisplayName: auth.currentUser.displayName,
            userEmail: auth.currentUser.email,
        });

        setNewTree("");
        setLatitude("");
        setLongitude("");
    };
    // console.log(activeTree)

    return (
        <div ref={ref} className={`tree-info-drawer ${activeTree ? 'tree-info-drawer--show' : ''}`}>
            <div className="tree-info-drawer__content">
                {/* <Map 
                    mapSize='mini'
                    zoomSetting={18} 
                    mapCenter={[activeTree.geometry.coordinates[1],activeTree.geometry.coordinates[0]]}
                /> */}
                <h3>{toTitleCase(activeTree.properties.Type)}</h3>
                <h3>Enter new tree info:</h3>

                <form onSubmit={handleSubmit} className="new-tree-form">
                    <input 
                        className="new-tree-input"
                        placeholder="Add tree details here"
                        onChange={(e) => setNewTree(e.target.value)}
                        value={newTree}
                    /><br/>
                    <input 
                        className="latitude-input"
                        placeholder="Latitude"
                        onChange={(e) => setLatitude(e.target.value)}
                        value={latitude}
                    /><br/>
                    <input 
                        className="longitude-input"
                        placeholder="Longitude"
                        onChange={(e) => setLongitude(e.target.value)}
                        value={longitude}
                    /><br/>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                    <button onClick={removeActiveTree}>No more active tree</button>
                </form>
            </div>
        </div>
    );
}
