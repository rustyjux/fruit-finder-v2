import { FaTree, FaBuilding, FaUserLock, FaUserSecret } from 'react-icons/fa';
import { PiTree } from "react-icons/pi";

export const getDisplayText = (value, map) => {
    return map[value] || 'UNKNOWN VALUE'; // Default if the value is not found in the map
};

export const treeTypes = {
    apple: { color: 'red' },
    plum: { color: 'purple' },
    cherry: { color: 'pink' },
    pear: { color: 'green' },
    crabapple: { color: 'orange' },
    walnut: { color: 'brown' },
    other: { color: 'gray' }
  };

export const accessMap = {
    unknown: { text: 'Unknown access', icon: FaUserSecret },
    public: { text: 'Public', icon: PiTree },
    'private-shared': { text: 'Private (Shared)', icon: FaBuilding },
    private: { text: 'Private', icon: FaUserLock }
  };
  
export function getAccessDisplayText(accessValue, withIcon = false) {
    const { text, icon: Icon } = accessMap[accessValue] || { text: 'UNKNOWN VALUE', icon: null };

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
