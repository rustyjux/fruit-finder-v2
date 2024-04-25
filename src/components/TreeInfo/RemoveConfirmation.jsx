import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { RemoveTreeSchema } from '@/schema';

const RemoveConfirmation = ({ onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const form = useForm({
    resolver: zodResolver(RemoveTreeSchema),
    defaultValues: {
      reason: ""
    }
  })

  const {
    formState: { isDirty, isSubmitting}
  } = form;
  
  const handleConfirm = async (data) => {
    await onRemove(data.reason);
  };

  return (
    <>
      <Button type="button" variant="destructive" onClick={handleOpen}>
        Remove
      </Button>
      <AlertDialog open={isOpen} onClose={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This will remove the tree from the map. <br/> This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form 
            // onSubmit={form.handleSubmit(handleConfirm)} 
            className="space-y-4 p-4 pb-4 pt-0">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Reason for removal</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., does not exist, dead tree" {...field} />
                        </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="button-row flex space-x-4">
                <Button type="submit" variant="destructive" className="w-full" 
                onClick={form.handleSubmit(handleConfirm)}
                disabled={isSubmitting || !isDirty}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <Button type="button" variant="outline" className="w-full"
                onClick={handleClose}
                  >
                    Cancel</Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveConfirmation;