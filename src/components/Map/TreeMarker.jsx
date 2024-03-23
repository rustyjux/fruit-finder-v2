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

  const type = tree.type.toLowerCase();
  const color = treeTypes[type]?.color || treeTypes['other'].color; // Default to blue if no mapping found

  const isActive = activeTree && activeTree.id === tree.id;

  // check if picked in last year
  
  const lastPickedTime = tree?.lastPickedTime;
  if (lastPickedTime) {
    const currentDate = new Date();
    const janFirst = new Date(currentDate.getFullYear(), 0, 1);
    const lastPickedTimeDt = lastPickedTime.toDate();
    tree.picked = lastPickedTimeDt > janFirst;
  }

  return (
    <>
      <CircleMarker 
        center={[tree.location.latitude, tree.location.longitude]}
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
      
      {tree.treeCount > 1 && (
        <Marker 
        position={[tree.location.latitude, tree.location.longitude]} 
        icon={multipleLIcon}
        eventHandlers={{ click: (e) => makeActiveTree(tree) }}
        >
        </Marker>
      )}
      {tree.access === 'private' && (
        <Marker 
        position={[tree.location.latitude, tree.location.longitude]} 
        icon={barLIcon}
        eventHandlers={{ click: (e) => makeActiveTree(tree) }}
        >
        </Marker>
      )}
    </>
  );
};
