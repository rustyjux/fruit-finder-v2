import { Button } from "@/components/ui/button"
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
import * as displayText from "../../utils/displayText";

export default function ViewEditTree({ activeTree, removeActiveTree, isViewEditVisible, setIsViewEditVisible }) {

  return (
    <TreeDrawer
    title="Tree info"
    // label="Drag the marker to adjust tree location"
    open={isViewEditVisible}
    setOpen={setIsViewEditVisible}
    >
     {activeTree && activeTree!=='new-tree' && <CurrentTree activeTree={activeTree}/>}
    </TreeDrawer>
    
  )
}