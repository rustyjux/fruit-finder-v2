import { FaTree, FaBuilding, FaUserLock, FaUserSecret } from 'react-icons/fa';
import { PiTree } from "react-icons/pi";

export const getDisplayText = (value, map) => {
    return map[value] || 'UNKNOWN VALUE'; // Default if the value is not found in the map
};

export const treeTypes = {
    apple: { color: 'green', label: 'Apple' },
    plum: { color: 'purple', label: 'Plum' },
    cherry: { color: 'pink', label: 'Cherry' },
    pear: { color: 'teal', label: 'Pear' },
    crabapple: { color: 'orange', label: 'Crabapple' },
    other: { color: 'brown', label: 'Other'},
    fruit: { color: 'blue', label: 'Mixed'}
  };

export const accessMap = {
    'unknown': { text: 'Unknown access', icon: FaUserSecret },
    'public': { text: 'Public', icon: PiTree },
    'private-shared': { text: 'Private (Shared)', icon: FaBuilding },
    'private': { text: 'Private', icon: FaUserLock }
  };
  
export function getAccessDisplayText(accessValue, withIcon = false) {
    const { text, icon: Icon } = accessMap[accessValue] || { text: 'Unknown access', icon: FaUserSecret };

    if (withIcon && Icon) {
        return (
        <>
            <Icon /> {text}
        </>
        );
    }

    return text;
}

// export const adoptionStatusMap = {
//     yes: 'Yes',
//     no: 'No'
// };
// export const getAdoptionStatusDisplayText(statusValue) {
// return getDisplayText(statusValue, adoptionStatusMap);
// };
