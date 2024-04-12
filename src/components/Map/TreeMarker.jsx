import { Marker, CircleMarker } from 'react-leaflet';
import { appleLIcon, lockedLIcon, multipleLIcon, barLIcon } from './MapIcons';
import { treeTypes } from '@/utils/displayText';

export default function TreeMarker ({ tree, activeTree, makeActiveTree }) {
  
  // Mapping of tree types to colors
  const typeColorMapping = {
    apple: 'green',
    plum: 'purple',
    // Add more tree types and colors as needed
  };

  const type = tree.treeType.toLowerCase();
  const color = treeTypes[type]?.color || treeTypes['other'].color; // Default to blue if no mapping found

  const isActive = activeTree && activeTree.id === tree.id;

  // check if picked in last year
  const lastPickedDate = tree.lastPickedDate;
  if (lastPickedDate) {
    const currentDate = new Date();
    const janFirst = new Date(currentDate.getFullYear(), 0, 1);
    const lastPickedDateDt = lastPickedDate.toDate();
    tree.picked = lastPickedDateDt > janFirst;
  }

  const getCounterIcon = (count) => {
    if (count > 1 && count <= 4) {
      return L.icon({
        iconUrl: `/assets/counters/counter-${count}.png`,
        iconSize: [15, 15], 
        iconAnchor: [0, 12],
      });
    } else {
      // Fallback icon
      return L.icon({
        iconUrl: `/assets/counters/counter-4.png`,
        iconSize: [15, 15], 
        iconAnchor: [0, 12],
      });
    }
  }
  

  return (
    <>
      <CircleMarker 
        center={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]}
        radius={isActive ? 12 : 8}
        // color={color}
        pathOptions={{ 
          color: tree.ripe ? 'yellow' : color,
          // color: isActive ? 'yellow' : (tree.ripe ? 'yellow' : color),
          // fillOpacity: tree.picked ? 0 : 0.4
          fillOpacity: tree.picked ? 0.4 : (tree.ripe ? 1 : 0.4),
          // fillColor: tree.ripe ? 'tomato' : color
          fillColor: tree.picked ? 'white' : color
        }}
        eventHandlers={{ click: (e) => makeActiveTree(tree) }}

        >
      </CircleMarker>
      
      {/* apple marker for ripe tree */}
      {/* {tree.ripe && (
        <Marker 
        position={[tree.location.latitude, tree.location.longitude]} 
        icon={appleLIcon}
        eventHandlers={{ click: (e) => makeActiveTree(tree) }}
        >
        </Marker>
      )} */}
      
      {/* USE DIVICON HERE */}
      {tree.treeCount > 1 && (
        <Marker 
          position={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]}
          icon={getCounterIcon(tree.treeCount)}
          eventHandlers={{ click: (e) => makeActiveTree(tree) }}
        >
        </Marker>
      )}
      {tree.access === 'private' && (
        <Marker 
        position={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]} 
        icon={barLIcon}
        eventHandlers={{ click: (e) => makeActiveTree(tree) }}
        >
        </Marker>
      )}
    </>
  );
};
