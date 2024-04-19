import CurrentTree from "./CurrentTree";
import EditTree from "./EditTree";
import TreeDrawer from "./TreeDrawer";

import { useState } from "react";
import { toTitleCase } from "../../utils/helpers";
import * as displayText from "../../utils/displayText";

export default function ViewEditTree({ activeTree, removeActiveTree, isViewEditVisible, setIsViewEditVisible, draggablePosition, setDraggablePosition, setEditPosition, endEditPosition }) {

  const [isEditTreeVisible, setIsEditTreeVisible] = useState(false);

  const treeHeader = displayText.getAccessDisplayText(activeTree.access, true)

  function handleRemoveActiveTreeWithDelay() {
    setEditPosition(false)
    setTimeout(() => {
        removeActiveTree();
    }, 150); 
  }

  const [snap, setSnap] = useState(1);
  const snapPoints = [0.4,1]

  const getConditionalProps = (isVisible) => {
    if (isVisible) {
      return {
        activeSnapPoint: snap,
        snapPoints: snapPoints,
        setActiveSnapPoint: setSnap
      }};
    return {};
  }

  return (
    <TreeDrawer
    title={`${toTitleCase(activeTree.treeType)} · ${activeTree.treeCount && activeTree.treeCount !== 1 ? activeTree.treeCount + ' trees' : '1 tree'} · ${displayText.getAccessDisplayText(activeTree.access, false)}`}
    // label="Drag the marker to adjust tree location"
    modal={false}
    dismissible={isEditTreeVisible ? false : true}
    open={isViewEditVisible}
    onOpenChange={setIsViewEditVisible}
    {...getConditionalProps(isEditTreeVisible)}
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
        endEditPosition={endEditPosition}
        setEditPosition={setEditPosition}
        snapPoints={snapPoints}
        setSnap={setSnap}
        handleRemoveActiveTreeWithDelay={handleRemoveActiveTreeWithDelay}
      />}
    </TreeDrawer> 
  )
}