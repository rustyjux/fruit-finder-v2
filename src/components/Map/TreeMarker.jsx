import { CircleMarker } from 'react-leaflet';

export default function TreeMarker ({ tree, activeTree, makeActiveTree }) {
  
  // Mapping of tree types to colors
  const typeColorMapping = {
    apple: 'green',
    plum: 'purple',
    // Add more tree types and colors as needed
  };

  const type = tree.properties.Type.toLowerCase();
  const color = typeColorMapping[type] || 'blue'; // Default to blue if no mapping found

  const isActive = activeTree && activeTree.id === tree.id;

  return (
    <CircleMarker 
      center={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]}
      radius={isActive ? 12 : 8}
      // color={color}
      pathOptions={{ color: isActive ? 'yellow' : color }}
      eventHandlers={{
        click: (e) => {
          console.log('marker clicked', e)
          makeActiveTree(tree)
        },
      }}
    >
      {/* <Popup position={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]}>
        <div>
          <h2>{"Tree type: " + tree.properties.Type}</h2>
          <div>{"ID: " + tree.id}</div>
          <button onClick={null} className='change-tree-type'>Make it a banana!</button>
        </div>
      </Popup> */}
    </CircleMarker>
  );
};
