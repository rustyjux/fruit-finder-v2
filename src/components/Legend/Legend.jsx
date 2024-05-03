import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { treeTypes } from "@/utils/displayText";
import { accessMap } from "@/utils/displayText";
import { Button } from "../ui/button";
import { colorToRGBA } from "../../utils/helpers";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";

export default function Legend({ onSelectedFiltersChange, appSelectedFilters, resetFilters, isLegendVisible, setIsLegendVisible }) {
  const [selectedFilters, setSelectedFilters] = useState(appSelectedFilters);

  const resetFiltersHandle = () => {
    setSelectedFilters(resetFilters);
    onSelectedFiltersChange(resetFilters);
  }
  
  const handleSelectionChange = (type, key) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [type]: {
          ...(prevFilters?.[type] || {}),
          [key]: !(prevFilters?.[type]?.[key] || false),
        },
      };
      onSelectedFiltersChange(updatedFilters);
      return updatedFilters;
    });
  };
  
  return (
    <Drawer
     open={isLegendVisible}
    //  onOpenChange={isLegendVisible ? null : setIsLegendVisible}
     onOpenChange={setIsLegendVisible}
     modal={false}
     dismissible={true}
     direction={"right"}
    >
      {/* DrawerTrigger and DrawerContent */}
      <DrawerContent className="h-screen top-0 right-[-2px] left-auto mt-0 w-[120px] z-[2000] no-handle" >
        <div className="">        
          <DrawerTitle className='pt-2 pb-1 text-center '>Tree type</DrawerTitle>
          {Object.entries(treeTypes).map(([key, value]) => (
            <Button
            size='sm'
            key={key}
            className='w-full rounded-none my-0.5 text-left block'
            variant="toggle"
            active={selectedFilters.treeTypes[key] || false}
            onClick={() => handleSelectionChange("treeTypes", key)}
            style={{
              backgroundColor: selectedFilters.treeTypes[key] ? colorToRGBA(value.color, 0.4) : "transparent",
              // border: `2px solid ${colorToRGBA(value.color, 0.8)}`,
            }}
            >
              {value.label}
            </Button>
          ))}
          <DrawerTitle className='pt-4 pb-1 text-center'>Access</DrawerTitle>
          {Object.entries(accessMap).map(([key, value]) => (
            <Button
              size='sm'
              key={key}
              className='w-full rounded-none my-0.5 text-left block'
              variant="toggle"
              active={selectedFilters.access[key] || false}
              onClick={() => handleSelectionChange("access", key)}
              style={{
                backgroundColor: selectedFilters.access[key] ? '#abc7ed' : "transparent",
              }}
            >
              <div className="flex items-center">
                {key === 'private' && <MdOutlineDoNotDisturbOn className="mr-1 w-5 h-5" />}
                {value.shorttext || value.text}
              </div>
            </Button>
          ))}
          <Button
            size='sm'
            key='ripeOnly'
            className='w-full rounded-none mt-4 text-left block'
            variant="toggle"
            active={selectedFilters.ripe?.ripeOnly || false}
            onClick={() => handleSelectionChange("ripe", 'ripeOnly')}
            style={{
              backgroundColor: selectedFilters.ripe?.ripeOnly ? 'rgb(255, 255, 59, 0.6)' : "transparent",
            }}
          >
          Ripe trees only
          </Button>
          <DrawerDescription className='flex-column items-center p-1'>Use the toggles to filter trees
          </DrawerDescription>
          <DrawerFooter className='flex-column items-center p-1'>
            <Button size='sm' variant="outline" onClick={resetFiltersHandle}>
              Reset filters
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
