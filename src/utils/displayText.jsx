import { MdOutlineDoNotDisturbOn } from "react-icons/md";

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
    'unknown': { text: 'Unknown access', shorttext: 'Unknown'},
    'public': { text: 'Public'},
    'private-shared': { text: 'Private (Shared)'},
    'private': { text: 'Private', icon: MdOutlineDoNotDisturbOn }
  };
  
export function getAccessDisplayText(accessValue) {
    const { text } = accessMap[accessValue] || { text: 'Unknown access', icon: FaUserSecret };
    return text;
}

export function getAccessIcon(accessValue) {
    const { icon: Icon } = accessMap[accessValue] || { icon: FaUserSecret };
    return Icon ? <Icon /> : null;
}