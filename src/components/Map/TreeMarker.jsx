import { Marker, CircleMarker } from 'react-leaflet';

export default function TreeMarker ({ tree, activeTree, makeActiveTree }) {
  
  // Mapping of tree types to colors
  const typeColorMapping = {
    apple: 'green',
    plum: 'purple',
    // Add more tree types and colors as needed
  };

  const type = tree.type.toLowerCase();
  const color = typeColorMapping[type] || 'blue'; // Default to blue if no mapping found

  const isActive = activeTree && activeTree.id === tree.id;

  const appleIcon = new  L.Icon({
    iconUrl: 'src/assets/red-apple.svg', // Replace 'path/to/star-icon.svg' with the actual path to your SVG file
    iconSize: [20, 20], // Adjust the size of the icon as needed
    iconAnchor: [16, 16], // Position the icon anchor at the center
  });

  return (
    <>
      <CircleMarker 
        center={[tree.location.latitude, tree.location.longitude]}
        radius={isActive ? 12 : 8}
        // color={color}
        pathOptions={{ 
          color: isActive ? 'yellow' : color,
          fillOpacity: tree.picked ? 0 : 0.4
          // fillOpacity: tree.picked ? 0 : (tree.ripe ? 0.7 : 0.3)
        }}
        eventHandlers={{ click: (e) => makeActiveTree(tree) }}

        >
      </CircleMarker>
      {tree.ripe && (
        <Marker 
        position={[tree.location.latitude, tree.location.longitude]} 
        icon={appleIcon}
        eventHandlers={{ click: (e) => makeActiveTree(tree) }}
        >
        </Marker>
      )}
      {/* {tree.treeCount > 1 && (
        <Marker 
        position={[tree.location.latitude, tree.location.longitude]} 
        icon={appleIcon}
        eventHandlers={{ click: (e) => makeActiveTree(tree) }}
        >
        </Marker>
      )} */}
    </>
  );
};
