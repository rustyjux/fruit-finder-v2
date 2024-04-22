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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "../ui/use-toast";
import { FaMinus, FaPlus } from 'react-icons/fa6';

import { NewTreeSchema } from "@/schema";

import { useState, useEffect, useRef } from "react";
import { updateDoc, doc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";
import { labelContent } from "./AddTree";

export default function EditTree({ 
  activeTree, 
  draggablePosition, 
  setDraggablePosition, 
  setIsEditTreeVisible,
  endEditPosition, 
  setEditPosition,
  snapPoints,
  setSnap,
  handleRemoveActiveTreeWithDelay
}) {
  const [key, setKey] = useState(+new Date())
  const { toast } = useToast()

  const treeId = activeTree.id
  const firebaseCollection = process.env.FIREBASE_COLLECTION
  // const treesCollectionRef = collection(db, firebaseCollection);
  const docRef = doc(db, firebaseCollection, treeId)

  const form = useForm({
    resolver: zodResolver(NewTreeSchema),
    defaultValues: {
      latitude: draggablePosition.lat,
      longitude: draggablePosition.lng,
      treeType: activeTree.treeType,
      treeCount: activeTree.treeCount ? activeTree.treeCount : 1,
      access: activeTree.access ? activeTree.access : 'unknown',
      notes: activeTree.notes ? activeTree.notes : ''
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

  useEffect(() => {
    setDraggablePosition({
      lat: activeTree.geometry.coordinates[1],
      lng: activeTree.geometry.coordinates[0]
    })
  }, []);

  useEffect(() => {
    setEditPosition(true)
  }, []);

  const onSubmit = async (data) => {
    console.log(data)
    await updateDoc(docRef, {
      geometry: {
        type: "Point",
        coordinates: [data.longitude, data.latitude]
      },
      treeType: data.treeType,
      treeCount: data.treeCount,
      access: data.access,
      notes: data.notes,
      createdDate: serverTimestamp(),
      createByName: auth.currentUser ? auth.currentUser.displayName : null,
      createdByEmail: auth.currentUser ? auth.currentUser.email : null,
      type: "Feature",
      removed: false
    });

    console.log("Document written with ID: ", docRef.id);
    
    endEditPosition()
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      className: cn(
          "fixed top-4 left-[50%] z-[100] flex max-h-screen w-3/5 translate-x-[-50%] flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]"),
      title: "Tree updated",
      // description: "Friday, February 10, 2023 at 5:57 PM",
    });

    // TODO: if isSubmitSuccessful is true:
    // set active tree to newly submitted tree

  }

  const onRemove = async (data) => {
    await updateDoc(docRef, {
      removed: true
      // geometry: {
      //   type: "Point",
      //   coordinates: [data.longitude, data.latitude]
      // },
      // treeType: data.treeType,
      // treeCount: data.treeCount,
      // access: data.access,
      // notes: data.notes,
      // createdDate: serverTimestamp(),
      // createByName: auth.currentUser ? auth.currentUser.displayName : null,
      // createdByEmail: auth.currentUser ? auth.currentUser.email : null,
      // type: "Feature"
    });

    console.log("Document written with ID: ", docRef.id), '- removed';
    
    endEditPosition()

    toast({
      className: cn(
          "fixed top-4 left-[50%] z-[100] flex max-h-screen w-3/5 translate-x-[-50%] flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]"),
      title: "Tree removed",
      // description: "Friday, February 10, 2023 at 5:57 PM",
    });
  }

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

  async function cancelEditTree(e) {
    // e.preventDefault();
    // setKey(+new Date())
    // reset(undefined)
    setIsEditTreeVisible(false)
    endEditPosition()
    // setSnap(null)
  }

  function shrinkDrawer() {
    setSnap(snapPoints[0])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 pb-4 pt-0">
        <div className="button-row flex space-x-4">
          <Button type="button" className="w-full" onClick={shrinkDrawer}>Edit location</Button>
          {/* <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button> */}
        </div>
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
          <div onClick={(e) => e.stopPropagation()}>
            <FormField
            control={form.control}
            name="treeType"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} key={key} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type of tree" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="plum">Plum</SelectItem>
                  <SelectItem value="cherry">Cherry</SelectItem>
                  <SelectItem value="pear">Pear</SelectItem>
                  <SelectItem value="crabapple">Crabapple</SelectItem>
                  {/* <SelectItem value="fruit">Mixed</SelectItem> */}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <FormField
            control={form.control}
            name="treeCount"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Number of trees</FormLabel>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl h-8 w-8 p-0"
                    onClick={() => {
                      const newValue = Math.max((field.value) - 1, 1);
                      field.onChange(newValue);
                    }}
                  >
                    <FaMinus />
                  </Button>
                  <div className="text-center min-w-6">
                    {field.value || 0} {/* Display the current value */}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl h-8 w-8 p-0"
                    onClick={() => {
                      const newValue = (parseInt(field.value, 10) + 1);
                      field.onChange(newValue);
                    }}
                  >
                    <FaPlus />
                  </Button>
                </div>
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
                <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" placeholder="Location details, tasting notes, access concerns..." />
                    </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="button-row flex space-x-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}
            // onClick={onSubmit}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Button type="button" variant="outline" className="w-full"
            onClick={cancelEditTree}
          >
              Cancel</Button>
          <Button type="button" variant="destructive" className=""
            onClick={onRemove} //TODO: removeTree
          >
            Remove
          </Button>
        </div>
      </form>
    </Form>
    
  )
}