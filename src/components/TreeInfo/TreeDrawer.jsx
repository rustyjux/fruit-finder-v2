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
import React, { Children, useState } from 'react'
import { Button } from "../ui/button"
import { X } from "lucide-react"

export default function TreeDrawer({ label, title, open, onOpenChange, snapPoints, activeSnapPoint, setActiveSnapPoint, closeButtonAction, children }) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} 
    modal={false} 
    snapPoints={snapPoints ? snapPoints : [1]}
    activeSnapPoint={activeSnapPoint}
    setActiveSnapPoint={setActiveSnapPoint}
    // className="xl:w-1/4 md:w-1/2 shadow-md"
    >
        {/* <DrawerTrigger className="z-2000">Open</DrawerTrigger> */}
        <DrawerContent>
        <DrawerHeader>
            <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X onClick={closeButtonAction} className="h-4 w-4" />
            </DrawerClose>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{label}</DrawerDescription>
        </DrawerHeader>
          {children}
        {/* <DrawerFooter>
            <DrawerClose>
            </DrawerClose>
        </DrawerFooter> */}
        </DrawerContent>
    </Drawer>
  )
}
