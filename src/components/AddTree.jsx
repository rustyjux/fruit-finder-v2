import { useState, useRef } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../utils/firebase";

export default function AddTree() {
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

    return (
        <div className="add-tree-menu">
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
