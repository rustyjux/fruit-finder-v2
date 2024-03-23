//NOT CURRENTLY USED

import L from 'leaflet';
// import appleIcon from '/assets/red-apple.svg'

// const appleLIcon = new L.Icon({
//     iconUrl: appleIcon,
//     iconAnchor: null,
//     popupAnchor: null,
//     shadowUrl: null,
//     shadowSize: null,
//     shadowAnchor: null,
//     iconSize: new L.Point(20, 20),
//     // className: 'leaflet-div-icon'
// });

// export { appleLIcon };

export const appleLIcon = new  L.Icon({
    iconUrl: '/assets/red-apple.svg', 
    iconSize: [20, 20],
    iconAnchor: [16, 16],
});

export const multipleLIcon = new  L.Icon({
    iconUrl: '/assets/plus-w-on-b3.svg',
    iconSize: [12, 12],
    iconAnchor: [0, 12],
});

export const lockedLIcon = new  L.Icon({
    iconUrl: '/assets/lock-short-grey.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
});