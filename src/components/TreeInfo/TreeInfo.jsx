import { useState, useRef, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";
import CurrentTree from "./CurrentTree";
import AddTree from "./AddTree";
import './TreeInfo.css'

export default function TreeInfo({ activeTree, removeActiveTree, isAddTreeVisible }) {
    const ref = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => 
      {
        if (ref.current && !ref.current.contains(event.target)) {
          removeActiveTree();
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, [activeTree, removeActiveTree]);

    console.log('TreeInfo: Active tree is: ', activeTree);

    return (
        <div ref={ref} className={`tree-info-drawer ${activeTree || isAddTreeVisible ? 'tree-info-drawer--show' : ''}`}>
            <div className="tree-info-drawer__content">
                {activeTree && <CurrentTree activeTree={activeTree}/>}
                {isAddTreeVisible && <AddTree />}
            </div>
        </div>
    );
}

