import { useState, useRef } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../utils/firebase";

export default function AddTree() {
    const [newTree, setNewTree] = useState("");
    const treeInputRef = useRef(null);
    
    const treesCollectionRef = collection(db, "trees")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTree === "") return;

        await addDoc(treesCollectionRef, {
            description: newTree,
            createdAt: serverTimestamp(),
            userDisplayName: auth.currentUser.displayName,
            userEmail: auth.currentUser.email,
        });

        setNewTree("");
    }
    return (
        <div className="add-tree-menu">
            <h3>Enter new tree info:</h3>

            <form onSubmit={handleSubmit} className="new-tree-form">
                <input 
                    className="new-tree-input"
                    placeholder="Add tree details here"
                    onChange={(e) => setNewTree(e.target.value)}
                    value={newTree}
                />
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
            {/* <br/>

            <input ref={treeInputRef} />
            <button onClick={() => setNewTree(treeInputRef.current.value)}>
                Submit new tree
            </button> */}
        </div>
    )
}