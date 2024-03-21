import { CircleMarker } from 'react-leaflet';

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

  return (
    <CircleMarker 
      center={[tree.location.latitude, tree.location.longitude]}
      radius={isActive ? 12 : 8}
      // color={color}
      pathOptions={{ 
        color: isActive ? 'yellow' : color,
        fillOpacity: tree.picked ? 0 : (tree.ripe ? 0.7 : 0.3)
      }}
      eventHandlers={{
        click: (e) => {
          // console.log('marker clicked', e)
          makeActiveTree(tree)
        },
      }}
    >
    </CircleMarker>
  );
};
