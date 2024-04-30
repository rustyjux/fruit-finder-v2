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

export default function Legend({ onSelectedFiltersChange, appSelectedFilters }) {
  const [selectedFilters, setSelectedFilters] = useState(appSelectedFilters);

  const handleSelectionChange = (type, key) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [type]: {
          ...prevFilters[type],
          [key]: !prevFilters[type][key],
        },
      };
      // Call onSelectedFiltersChange with the final updatedFilters
      if (onSelectedFiltersChange) {
        onSelectedFiltersChange(updatedFilters);
      }
      return updatedFilters;
    });
  };
  
  return (
    <Drawer open={open} modal={false} dismissible={true} direction={"right"}>
      {/* DrawerTrigger and DrawerContent */}
      <DrawerContent className="p-4 h-screen top-0 right-0 left-auto mt-0 w-[150px] rounded-none">
        <br />
        <h1>Type</h1>
        <ul className="legend-list">
          {Object.entries(treeTypes).map(([key, value]) => (
            <li key={key} className="legend-item">
              <input
                type="checkbox"
                id={key}
                checked={selectedFilters.treeTypes[key] || false}
                onChange={() => handleSelectionChange("treeTypes", key)}
              />
              <label htmlFor={key} style={{ color: value.color }}>
                {value.label}
              </label>
            </li>
          ))}
        </ul>

        <br />
        <h1>Access</h1>
        <ul className="legend-list">
          {Object.entries(accessMap).map(([key, value]) => (
            <li key={key} className="legend-item">
              <input
                type="checkbox"
                id={key}
                checked={selectedFilters.access[key] || false}
                onChange={() => handleSelectionChange("access", key)}
              />
              <label htmlFor={key} style={{ color: value.color }}>
                {value.text}
              </label>
            </li>
          ))}
        </ul>
        {/* <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Reset</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};
