import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "../ui/use-toast";
import { toTitleCase } from "../../utils/helpers";
import * as displayText from "../../utils/displayText";
import { FaHandSparkles, FaPencil, FaHeart, FaRegStar, FaShareNodes } from 'react-icons/fa6';

// import './TreeInfo.css'

export default function CurrentTree({ activeTree }) {
    const { toast } = useToast()

    // Function to handle button clicks
    const handleButtonClick = (action) => {
        // Perform action based on button clicked
        switch (action) {
            case 'Pick':
                console.log('pick!')
                toast({
                    className: cn(
                        "fixed top-4 left-[50%] z-[100] flex max-h-screen w-3/5 translate-x-[-50%] flex-col-reverse p-4 sm:right-0 sm:flex-col md:max-w-[420px]"),
                    title: "Tree marked as picked",
                    // description: "Friday, February 10, 2023 at 5:57 PM",
                  });
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
                {activeTree.notes && (<p >{activeTree.notes}</p>)}
            </div>
            {/* BUTTONS */}
            {/* <div className="p-2 grid grid-cols-4 gap-x-3"> */}
            <div className="p-2 space-x-2 overflow-x-auto whitespace-nowrap">
                <Button variant="" size="sm" onClick={() => handleButtonClick('Pick')}>
                    <FaHandSparkles className="mr-2 h-4 w-4"/> Picked
                </Button>
                <Button size="sm" onClick={() => handleButtonClick('Edit')}>
                    <FaPencil className="mr-2 h-4 w-4"/> Edit
                </Button>
                <Button size="sm" onClick={() => handleButtonClick('Adopt')}>
                    <FaHeart className="mr-2 h-4 w-4"/> Adopt
                </Button>
                <Button size="sm" onClick={() => handleButtonClick('MarkRipe')}>
                    <FaRegStar className="mr-2 h-4 w-4"/> It's ripe!
                </Button>
                {/* <Button size="sm" onClick={() => handleButtonClick('Share')}>
                    <FaShareNodes className="mr-2 h-4 w-4"/> Share
                </Button> */}
            </div>

        </>
    );
};
