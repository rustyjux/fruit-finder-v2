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
import TreeDrawer from "./TreeDrawer";

import { useState, useEffect, useRef } from "react";
import { toTitleCase } from "../../utils/helpers";
import * as displayText from "../../utils/displayText";

export default function ViewEditTree({ activeTree, removeActiveTree, isViewEditVisible, setIsViewEditVisible }) {

const treeHeader = displayText.getAccessDisplayText(activeTree.access, true)

  return (
    <TreeDrawer
    title={`${toTitleCase(activeTree.type)} · ${activeTree.treeCount && activeTree.treeCount !== 1 ? activeTree.treeCount + ' trees' : '1 tree'} · ${displayText.getAccessDisplayText(activeTree.access, false)}`}
    // label="Drag the marker to adjust tree location"
    open={isViewEditVisible}
    onOpenChange={setIsViewEditVisible}
    >
     {activeTree && activeTree!=='new-tree' && <CurrentTree activeTree={activeTree}/>}
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