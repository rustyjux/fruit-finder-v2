import CurrentTree from "./CurrentTree";
import EditTree from "./EditTree";
import TreeDrawer from "./TreeDrawer";

import { useState } from "react";
import { toTitleCase } from "../../utils/helpers";
import * as displayText from "../../utils/displayText";
import { getLabelContent } from "./AddTree";
import { treeTypes } from "../../utils/displayText";
import { colorToHex } from "../../utils/helpers";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";

export default function ViewEditTree({ activeTree, removeActiveTree, isViewEditVisible, setIsViewEditVisible, draggablePosition, setDraggablePosition, setEditPosition, endEditPosition, zoomToLocationRequest, setZoomToLocationRequest }) {

  const [isEditTreeVisible, setIsEditTreeVisible] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false)
  
  const [editingLocationStarted, setEditingLocationStarted] = useState(false)
  const startEditingLocation = () => {
    setEditingLocationStarted(true)
  }
  const endEditingLocation = () => {
    setEditingLocationStarted(false)
  }

  function handleRemoveActiveTreeWithDelay() {
    setEditPosition(false)
    setTimeout(() => {
        removeActiveTree();
    }, 150); 
  }

  const [snap, setSnap] = useState(1);
  const snapPoints = [0.45,1]

  const getEditProps = (isVisible) => {
    if (isVisible) {
      return {
        activeSnapPoint: snap,
        snapPoints: snapPoints,
        setActiveSnapPoint: setSnap
      }};
    return {};
  }

  const treeTypeColor = treeTypes[activeTree.treeType]?.color || 'black';
  const treeTypeColorHex = colorToHex(treeTypeColor, 0.4);

  const accessText = displayText.getAccessDisplayText(activeTree.access);
  const accessIcon = displayText.getAccessIcon(activeTree.access);
  
  const treeDrawerTitle = (
    <div className="flex items-center justify-center">
      <div
        className="w-5 h-5 rounded-full mr-2 border-[3px]"
        style={{ backgroundColor: treeTypeColorHex, borderColor: treeTypeColor }}
      ></div>
      <div className="flex items-center">
        {`${toTitleCase(activeTree.treeType)} · ${activeTree.treeCount && activeTree.treeCount !== 1 ? activeTree.treeCount + ' trees' : '1 tree'} · `}
        {accessIcon && <span className="mx-1">{accessIcon}</span>}
        {accessText}
      </div>
    </div>
  );
  
  return (
    <TreeDrawer
    title={treeDrawerTitle}
    label={editingLocation ? getLabelContent(zoomToLocationRequest, setZoomToLocationRequest) : null}
    modal={false}
    dismissible={isEditTreeVisible ? false : true}
    open={isViewEditVisible}
    onOpenChange={editingLocationStarted ? null : setIsViewEditVisible}
    {...getEditProps(isEditTreeVisible)}
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
        editingLocation={editingLocation}
        setEditingLocation={setEditingLocation}
        editingLocationStarted={editingLocationStarted}
        startEditingLocation={startEditingLocation}
        endEditingLocation={endEditingLocation}
      />}
    </TreeDrawer> 
  )
}