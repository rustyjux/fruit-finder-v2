import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const FullPageDialog = ({ children, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-screen h-screen p-0 m-0">
        <div className="w-full h-full overflow-auto p-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullPageDialog;