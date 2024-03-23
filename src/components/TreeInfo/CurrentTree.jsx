import { useState, useEffect } from "react";

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "../ui/use-toast";
import { toTitleCase } from "../../utils/helpers";
import * as displayText from "../../utils/displayText";
import { FaHandSparkles, FaPencil, FaHeart, FaRegStar, FaShareNodes } from 'react-icons/fa6';

import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../utils/firebase";

export default function CurrentTree({ activeTree }) {
    const { toast } = useToast()
    const firebaseCollection = process.env.FIREBASE_COLLECTION
    const treeId = activeTree.id
    const docRef = doc(db, firebaseCollection, treeId)

    // check if picked in last year
    const [pickedThisYear, setPickedThisYear] = useState(false)
    const [dateString, setDateString] = useState("");
    
    useEffect(() => {
        const lastPickedTime = activeTree?.lastPickedTime;
        const currentDate = new Date();
        const janFirst = new Date(currentDate.getFullYear(), 0, 1);
        
        if (lastPickedTime) {
            const lastPickedTimeDt = lastPickedTime.toDate();
            const newDateString = lastPickedTimeDt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            setDateString(newDateString); // Update dateString state
            setPickedThisYear(lastPickedTimeDt > janFirst);
        } else {
            setPickedThisYear(false);
        }
    }, [activeTree]); 

    const onPick = async () => {
        let pickToastMsg = "Tree already marked picked"
        if (!pickedThisYear) {
            await updateDoc(docRef, {
                lastPickedTime: serverTimestamp(),
                lastPickedByName: auth.currentUser ? auth.currentUser.displayName : null,
                lastPickedByEmail: auth.currentUser ? auth.currentUser.email : null,
                ripe: false
            });
            pickToastMsg = "Tree marked as picked"
        }
    
        toast({
            className: cn(
                "fixed top-4 left-[50%] z-[100] flex max-h-screen w-3/5 translate-x-[-50%] flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]"),
            title: pickToastMsg,
        });  
    };

    const onRipe = async () => {
        const newRipeValue = !activeTree.ripe;
    
        await updateDoc(docRef, {
            ripe: newRipeValue,
            lastPickedTime: null
        });
    
        toast({
            className: cn(
                "fixed top-4 left-[50%] z-[100] flex max-h-screen w-3/5 translate-x-[-50%] flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]"),
            title: `Tree marked as ${newRipeValue ? 'ripe' : 'not ripe'}`, // Display appropriate message based on the new value
        });    
    };

    // Function to handle button clicks
    const handleButtonClick = (action) => {
        // Perform action based on button clicked
        switch (action) {

            case 'Edit':
                // Handle Edit action
                break;
            case 'Adopt':
                // Handle Adopt action
                break;
            case 'Share':
                // Handle Share action
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="space-y-0 p-2 pb-0 pt-0 flex flex-wrap items-start">
                {activeTree.ripe && <Badge variant="secondary" className="mb-2">Ripe</Badge>}
                {pickedThisYear && <Badge variant="secondary" className="mb-2">Picked - {dateString}</Badge>}
                {activeTree.notes && (<div className="w-full">{activeTree.notes}</div>)}
            </div>
            {/* BUTTONS */}
            {/* <div className="p-2 grid grid-cols-4 gap-x-3"> */}
            <div className="p-2 space-x-2 overflow-x-auto whitespace-nowrap">
                <Button variant="" size="sm" onClick={() => onPick()}>
                    <FaHandSparkles className="mr-2 h-4 w-4"/> Picked
                </Button>
                <Button size="sm" onClick={() => handleButtonClick('Edit')}>
                    <FaPencil className="mr-2 h-4 w-4"/> Edit
                </Button>
                {/* <Button size="sm" onClick={() => handleButtonClick('Adopt')}>
                    <FaHeart className="mr-2 h-4 w-4"/> Adopt
                </Button> */}
                <Button size="sm" onClick={() => onRipe()}>
                    <FaRegStar className="mr-2 h-4 w-4"/> It's ripe!
                </Button>
                {/* <Button size="sm" onClick={() => handleButtonClick('Share')}>
                    <FaShareNodes className="mr-2 h-4 w-4"/> Share
                </Button> */}
            </div>

        </>
    );
};
