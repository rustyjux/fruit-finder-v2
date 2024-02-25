import { FaTree, FaBuilding, FaUserLock, FaUserSecret } from 'react-icons/fa';

export const getDisplayText = (value, map) => {
    return map[value] || 'UNKNOWN VALUE'; // Default if the value is not found in the map
};

const accessMap = {
    unknown: { text: 'Unknown', icon: FaUserSecret },
    public: { text: 'Public', icon: FaTree },
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
