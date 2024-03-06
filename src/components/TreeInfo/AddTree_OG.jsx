import { useState, useRef } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";
import * as displayText from "../../utils/displayText";
import './TreeInfo.css'

export default function AddTreeOld({ mapCenter }) {
    console.log(mapCenter)
    const treeTypes = displayText.treeTypes
    const accessMap = displayText.accessMap
    
    const [latitude, setLatitude] = useState(mapCenter.latitude);
    const [longitude, setLongitude] = useState(mapCenter.longitude);
    const [treeType, setTreeType] = useState('apple');
    const [numTrees, setNumTrees] = useState(1);
    const [access, setAccess] = useState('unknown');
    const [notes, setNotes] = useState('');
    
    const treesCollectionRef = collection(db, "trees");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (latitude === "" || longitude === "") return;

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
            {/* <Map 
                mapSize='mini'
                zoomSetting={18} 
                mapCenter={[activeTree.geometry.coordinates[1],activeTree.geometry.coordinates[0]]}
            /> */}

            <p><b>New tree</b></p>
            <form onSubmit={handleSubmit} className="new-tree-form">
                <div>
                    <label>Latitude: </label>
                    <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                </div>
                <div>
                    <label>Longitude: </label>
                    <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                </div>
                <div>
                    <label>Type: </label>
                    <select value={treeType} onChange={(e) => setTreeType(e.target.value)}>
                    {Object.keys(treeTypes).map((type) => (
                        <option key={type} value={type}>
                        {type}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <label>Number of trees: </label>
                    <input type="number" value={numTrees} onChange={(e) => setNumTrees(e.target.value)} />
                </div>
                <div>
                    <label>Access: </label>
                    <select value={access} onChange={(e) => setAccess(e.target.value)}>
                    {Object.keys(accessMap).map((key) => (
                        <option key={key} value={key}>
                        {accessMap[key].text}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <label>Notes: </label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Location details, tasting notes, access concerns" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
