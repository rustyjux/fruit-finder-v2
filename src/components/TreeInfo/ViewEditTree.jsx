// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import CurrentTree from "./CurrentTree";
import EditTree from "./EditTree";
import TreeDrawer from "./TreeDrawer";

import { useState, useEffect, useRef } from "react";
import { toTitleCase } from "../../utils/helpers";
import * as displayText from "../../utils/displayText";

export default function ViewEditTree({ activeTree, removeActiveTree, isViewEditVisible, setIsViewEditVisible, draggablePosition, setDraggablePosition, setEditPosition, endEditTree }) {

  const [isEditTreeVisible, setIsEditTreeVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(isViewEditVisible); // Initial state based on isViewEditVisible

  const treeHeader = displayText.getAccessDisplayText(activeTree.access, true)

  function handleRemoveActiveTreeWithDelay() {
    setEditPosition(false)
    setTimeout(() => {
        removeActiveTree();
    }, 150); 
  }

  const handleDrawerOpenChange = (isOpen) => {
    console.log('change')
    setIsDrawerVisible(isOpen);
    if (!isOpen) {
      setIsViewEditVisible(false)
      handleRemoveActiveTreeWithDelay();
    }
  }


  const [snap, setSnap] = useState(1);
  const snapPoints = [0.5,1]

  return (
    <TreeDrawer
    title={`${toTitleCase(activeTree.treeType)} · ${activeTree.treeCount && activeTree.treeCount !== 1 ? activeTree.treeCount + ' trees' : '1 tree'} · ${displayText.getAccessDisplayText(activeTree.access, false)}`}
    // label="Drag the marker to adjust tree location"
    modal={false}
    dismissible={false}
    open={isDrawerVisible}
    onOpenChange={handleDrawerOpenChange}
    activeSnapPoint={snap}
    snapPoints={snapPoints}
    setActiveSnapPoint={setSnap}
    closeButtonAction={handleRemoveActiveTreeWithDelay}
    >
      {activeTree && activeTree!=='new-tree' && !isEditTreeVisible && 
        <CurrentTree
         activeTree={activeTree}
         setIsEditTreeVisible={setIsEditTreeVisible}
        />
      }
      {isEditTreeVisible && 
        <EditTree 
        activeTree={activeTree}
        draggablePosition={draggablePosition}
        setDraggablePosition={setDraggablePosition}
        setIsEditTreeVisible={setIsEditTreeVisible}
        endEditTree={endEditTree}
        setEditPosition={setEditPosition}
        snapPoints={snapPoints}
        setSnap={setSnap}
      />}
    </TreeDrawer>
    

//       <Dialog open={isViewEditVisible} onOpenChange={setIsViewEditVisible} modal={true}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Account</DialogTitle>
//           <DialogDescription>
// Hello! 
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
  )
}