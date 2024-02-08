import { useState, useRef } from "react";
import { CircleMarker, Popup } from 'react-leaflet';

export default function TreeMarker ({ tree, makeActiveTree }) {
  const [activeTree, setActiveTree] = useState()
  
  // Mapping of tree types to colors
  const typeColorMapping = {
    apple: 'green',
    plum: 'purple',
    // Add more tree types and colors as needed
  };

  const type = tree.properties.Type.toLowerCase();
  const color = typeColorMapping[type] || 'blue'; // Default to blue if no mapping found

  return (
    <CircleMarker 
      center={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]}
      radius={8} // Adjust the radius of the circle marker
      color={color} // Set the color based on the mapping
      eventHandlers={{
        click: (e) => {
          console.log('marker clicked', e)
          makeActiveTree(tree.id)
        },
      }}
    >
      <Popup position={[tree.geometry.coordinates[1], tree.geometry.coordinates[0]]}>
        <div>
          <h2>{"Tree type: " + tree.properties.Type}</h2>
          <div>{"ID: " + tree.id}</div>
          <button onClick={null} className='change-tree-type'>Make it a banana!</button>
        </div>
      </Popup>
    </CircleMarker>
  );
};
