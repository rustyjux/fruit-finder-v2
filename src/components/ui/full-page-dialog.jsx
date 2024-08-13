import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const FullPageDialog = ({ children, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full">
        <div className="w-full h-full overflow-hidden">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullPageDialog;