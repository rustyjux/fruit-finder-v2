import { useState, useRef } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";
import Map from "../Map/Map";

export default function EditTree({ activeTree }) {
    console.log('EditTree: Active tree is: ', activeTree);
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
        <div className="add-tree-menu">
            <Map 
                zoomSetting={18} 
                mapCenter={[activeTree.geometry.coordinates[1],activeTree.geometry.coordinates[0]]}
            />
            <h3>Active tree id: {activeTree.id}</h3>
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
            </form>
        </div>
    );
}
