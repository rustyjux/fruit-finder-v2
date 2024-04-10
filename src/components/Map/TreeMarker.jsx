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

  const type = tree.properties.type.toLowerCase();
  const color = treeTypes[type]?.color || treeTypes['other'].color; // Default to blue if no mapping found

  const isActive = activeTree && activeTree.id === tree.id;

  // check if picked in last year
  
  const lastPickedTime = tree.properties?.lastPickedTime;
  if (lastPickedTime) {
    const currentDate = new Date();
    const janFirst = new Date(currentDate.getFullYear(), 0, 1);
    const lastPickedTimeDt = lastPickedTime.toDate();
    tree.properties.picked = lastPickedTimeDt > janFirst;
  }

  return (
    <>
      <CircleMarker 
        center={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]}
        radius={isActive ? 12 : 8}
        // color={color}
        pathOptions={{ 
          color: tree.properties.ripe ? 'yellow' : color,
          // color: isActive ? 'yellow' : (tree.properties.ripe ? 'yellow' : color),
          // fillOpacity: tree.properties.picked ? 0 : 0.4
          fillOpacity: tree.properties.picked ? 0.4 : (tree.properties.ripe ? 1 : 0.4),
          // fillColor: tree.properties.ripe ? 'tomato' : color
          fillColor: tree.properties.picked ? 'white' : color
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
      
      {tree.properties.treeCount > 1 && (
        <Marker 
        position={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]} 
        icon={multipleLIcon}
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
