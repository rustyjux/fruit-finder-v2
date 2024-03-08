import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
 
import { useState, useRef, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";
import CurrentTree from "./CurrentTree";
import AddTree from "./AddTree";
// import './TreeInfo.css'

export default function TreeInfo({ activeTree, removeActiveTree, isAddTreeVisible, removeAddTree, mapCenter }) {
    const ref = useRef(null);
    // useEffect(() => {
    //   const handleClickOutside = (event) => 
    //   {
    //     if (ref.current && !ref.current.contains(event.target)) {
    //       removeActiveTree();
    //     }
    //   };
    //   document.addEventListener('click', handleClickOutside, true);
    //   return () => {
    //     document.removeEventListener('click', handleClickOutside, true);
    //   };
    // }, [activeTree, removeActiveTree]);

    console.log('TreeInfo: Active tree is: ', activeTree);

    const [showMenu, setShowMenu] = useState(false)
    const prevShowMenuRef = useRef(false);

    useEffect(() => {
      // Set showMenu to true if either activeTree or addTree is true
      setShowMenu(activeTree !== null || isAddTreeVisible );
    }, [activeTree, isAddTreeVisible]);

    useEffect(() => {
      if (!showMenu && prevShowMenuRef.current) {
        removeActiveTree();
        removeAddTree();
      }
      prevShowMenuRef.current = showMenu;
    }, [showMenu, removeActiveTree]);
    
    return (
      <Drawer open={showMenu} onOpenChange={setShowMenu} modal={false}>
        {/* <DrawerTrigger>Open</DrawerTrigger> */}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          {activeTree && activeTree!=='new-tree' && <CurrentTree activeTree={activeTree}/>}
          {/* {activeTree && EDITCONDITION && <EditTree mapCenter={mapCenter} />} */}
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose>
              {/* <Button variant="outline">Cancel</Button> */}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

        // <div ref={ref} className={`bg-background tree-info-drawer ${activeTree || isAddTreeVisible ? 'tree-info-drawer--show' : ''}`}>
        //     <div className="tree-info-drawer__content">
        //         {activeTree && <CurrentTree activeTree={activeTree}/>}
        //         {isAddTreeVisible && <AddTree mapCenter={mapCenter} />}
        //     </div>
        // </div>
    );
}

