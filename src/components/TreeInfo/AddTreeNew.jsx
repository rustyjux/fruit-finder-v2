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
import { toast } from "@/components/ui/use-toast"

import TreeActionDrawer from "./TreeActionDrawer";
import { NewTreeSchema } from "@/schema";

import { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";
import * as displayText from "../../utils/displayText";
import './TreeInfo.css'

export default function AddTreeNew({ isAddTreeVisible, setIsAddTreeVisible, mapCenter }) {
  const [key, setKey] = useState(+new Date())

  const form = useForm({
    resolver: zodResolver(NewTreeSchema),
    defaultValues: {
      latitude: mapCenter.latitude,
      longitude: mapCenter.longitude,
      type: "apple",
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
    formState: { isSubmitting, isSubmitSuccessful }
  } = form;

  console.log("issubmit", isSubmitting)
  console.log("issubmit successfull", isSubmitSuccessful)

  const onSubmit = async (data) => {
    console.log('submitted!')
    console.log(form)
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // TODO: if isSubmitSuccessful is true:
    // reset form, hide drawer, display toast 

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  useEffect(() => {
    // Watch for changes in mapCenter and update form values accordingly
    setValue('latitude', mapCenter.latitude);
    setValue('longitude', mapCenter.longitude);
  }, [mapCenter, setValue]);

  // reset form after submission
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setKey(+new Date())
      reset();
    }
  }, [formState, reset]);

  return (
    <TreeActionDrawer
    title="Add a new tree"
    // label="describe this form"
    open={isAddTreeVisible}
    setOpen={setIsAddTreeVisible}
    >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 pb-0">
        <div className="space-y-0">
        <Button 
        onClick={(e) => {
          e.stopPropagation()
          setKey(+new Date())
          reset(undefined)
        }}
          >
            Reset</Button>
        <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Location details, tasting notes, access concerns..." />
                </FormControl>
                <FormMessage />
              <FormDescription>
              </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
    </TreeActionDrawer>
    
  )
}