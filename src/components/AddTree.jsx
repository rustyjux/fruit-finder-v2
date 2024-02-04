import Auth from "./Auth";
import { useState, useRef } from "react";

export default function AddTree() {
    const [newTree, setNewTree] = useState(null);

    const treeInputRef = useRef(null);

    return (
        <div className="add-tree-menu">
            <h1>Enter new tree info:</h1>
            <input ref={treeInputRef} />
            <button onClick={() => setNewTree(treeInputRef.current.value)}>
                Submit new tree
            </button>
        </div>
    )
}