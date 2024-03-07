import { useToast } from "../ui/use-toast";
import { toTitleCase } from "../../utils/helpers";
import * as displayText from "../../utils/displayText";
import { FaHandSparkles, FaPencil, FaHeart, FaShareNodes } from 'react-icons/fa6'; // Import icons
import './TreeInfo.css'

export default function CurrentTree({ activeTree }) {
    const { toast } = useToast()

    // Function to handle button clicks
    const handleButtonClick = (action) => {
        // Perform action based on button clicked
        switch (action) {
            case 'Pick':
                console.log('pick!')
                toast({
                    title: "Scheduled: Catch up",
                    description: "Friday, February 10, 2023 at 5:57 PM",
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
            <h3></h3>
            <p>
                <b>{toTitleCase(activeTree.type)}</b>
                {` · ${activeTree.treeCount && activeTree.treeCount !== 1 ? activeTree.treeCount + ' trees' : '1 tree'} · `}
                {displayText.getAccessDisplayText(activeTree.access, true)}
            </p>

            {/* BUTTONS */}
            <div className="ctrl-button-row">
                <button className="ctrl-button-row__btn btn--emphasis" onClick={() => handleButtonClick('Pick')}>
                    <FaHandSparkles /> Pick
                </button>
                <button className="ctrl-button-row__btn" onClick={() => handleButtonClick('Edit')}>
                    <FaPencil /> Edit
                </button>
                <button className="ctrl-button-row__btn" onClick={() => handleButtonClick('Adopt')}>
                    <FaHeart /> Adopt
                </button>
                <button className="ctrl-button-row__btn" onClick={() => handleButtonClick('Share')}>
                    <FaShareNodes /> Share
                </button>
            </div>

            {activeTree.notes && (<p>{activeTree.notes}</p>)}
        </>
    );
};
