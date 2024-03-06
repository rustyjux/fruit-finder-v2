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

function TreeActionDrawer({ label, title, open, setOpen, children }) {

  return (
    <Drawer open={open} onOpenChange={setOpen} 
    modal={false} 
    snapPoints={[0.5,1]}
    // className="xl:w-1/4 md:w-1/2 shadow-md"
    >
        {/* <DrawerTrigger className="z-2000">Open</DrawerTrigger> */}
        <DrawerContent>
        <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{label}</DrawerDescription>
        </DrawerHeader>
          {children}
        <DrawerFooter>
            <DrawerClose>
            </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
    </Drawer>
  )
}

export default TreeActionDrawer