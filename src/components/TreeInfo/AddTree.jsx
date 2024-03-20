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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "../ui/use-toast";


import TreeDrawer from "./TreeDrawer";
import { NewTreeSchema } from "@/schema";

import { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";
import { isDirective } from "@babel/types";

export default function AddTree({ isAddTreeVisible, setIsAddTreeVisible, draggablePosition, endAddTree }) {
  const [key, setKey] = useState(+new Date())
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(NewTreeSchema),
    defaultValues: {
      latitude: draggablePosition.lat,
      longitude: draggablePosition.lng,
      // type: null,
      treeCount: 1,
      access: "unknown",
      notes: ""
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState,
    formState: { isDirty, dirtyFields, isSubmitting, isSubmitSuccessful }
  } = form;

  // console.log('is dirty', isDirty)
  // console.log('touched fields', touchedFields)

  const firebaseCollection = process.env.FIREBASE_COLLECTION
  const treesCollectionRef = collection(db, firebaseCollection);

  const onSubmit = async (data) => {
    console.log('submitted!')
    
    await addDoc(treesCollectionRef, {
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      type: data.type,
      treeCount: data.treeCount,
      access: data.access,
      notes: data.notes,
      createdAt: serverTimestamp(),
      userDisplayName: auth.currentUser ? auth.currentUser.displayName : "no username",
      userEmail: auth.currentUser ? auth.currentUser.email : null,
      new: true
    });
    
    endAddTree()
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      className: cn(
          "fixed top-4 left-[50%] z-[100] flex max-h-screen w-3/5 translate-x-[-50%] flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]"),
      title: "New tree added",
      // description: "Friday, February 10, 2023 at 5:57 PM",
    });

    // TODO: if isSubmitSuccessful is true:
    // set active tree to newly submitted tree
  }
  var activeSnapPoint = null
  const snapPoints = [0.65,1];
  const [snap, setSnap] = useState(0.6);

  // TODO: open the full drawer when user interacts with form
  useEffect(() => {
    if ('type' in dirtyFields) {
      console.log('dirty now')
      // setIsAddTreeVisible(true)
      setSnap(1)
    }
  }, [formState]);

  useEffect(() => {
    // Watch for changes in draggablePosition and update form values accordingly
    setValue('latitude', draggablePosition.lat);
    setValue('longitude', draggablePosition.lng);
  }, [draggablePosition, setValue]);

  // reset form after submission
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setKey(+new Date())
      reset();
    }
  }, [formState, reset]);

  async function cancelAddTree(e) {
    e.preventDefault();
    setKey(+new Date())
    reset(undefined)
    endAddTree()
    setSnap(null)
  }

  return (
    <TreeDrawer
    title="Add a new tree"
    label="Drag the marker to adjust tree location"
    open={isAddTreeVisible}
    onOpenChange={setIsAddTreeVisible}
    snapPoints={snapPoints}
    activeSnapPoint={snap}
    setActiveSnapPoint={setSnap}
    closeButtonAction={cancelAddTree}
    >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 pb-4 pt-0">
        <div className="space-y-2">
        <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} key={key}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type of tree" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="fruit">Mixed</SelectItem>
                  <SelectItem value="plum">Plum</SelectItem>
                  <SelectItem value="cherry">Cherry</SelectItem>
                  <SelectItem value="pear">Pear</SelectItem>
                  <SelectItem value="crabapple">Crabapple</SelectItem>
                  <SelectItem value="walnut">Walnut</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="treeCount"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Number of trees</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="" />
                </FormControl>
                <FormMessage />
              <FormDescription>
              </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="access"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Access</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} key={key}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ownership and access status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="unknown">Unknown</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private-shared">Private - Shared</SelectItem>
                  <SelectItem value="private">Private - Not Shared</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                  <FormLabel><AccordionTrigger>Notes</AccordionTrigger></FormLabel>
                    <AccordionContent>
                      <FormControl>
                        <Textarea {...field} className="resize-none" placeholder="Location details, tasting notes, access concerns..." />
                      </FormControl>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </FormItem>
            )}
          />
        </div>
        <div className="button-row flex space-x-4">
          <Button variant="outline" className="w-full"
          onClick={cancelAddTree}
            >
              Cancel</Button>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
    </TreeDrawer>
    
  )
}