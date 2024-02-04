import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import treeData from "../test-data/tree-data.json";
import { appleLIcon } from './MapIcons';
import TreeMarker from './TreeMarker';

// Get only actual tree points, not comments
const treeItems = treeData.features.filter(tree => tree.geometry);

export default function Map() {
    return (
        <MapContainer center={[49.076,-117.8023979]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://api.mapbox.com/styles/v1/rustyjux/clny3ijlz003j01mvbr8xeqrc/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnVzdHlqdXgiLCJhIjoiY2wxNTZ0ZmRxMHBvejNldjBvY2JpYTIzOCJ9.u3wYmClN0txsgeC9KM_HLw"
        />

        {treeItems.map(tree => (
          <TreeMarker key={tree.id} tree={tree} />
        ))}      

        {treeItems.map(tree => {
          return (
            <Marker 
              // className = {tree.properties.Type}
              key = {tree.id}
              position={[ tree.geometry.coordinates[1], tree.geometry.coordinates[0] ]}
              icon={appleLIcon}
            >
              <Popup
                position={[ tree.geometry.coordinates[1], tree.geometry.coordinates[0] ]}>
                <div>
                  <h2>A new tree?</h2>
                  {/* <h2>{"Tree type: " + tree.properties.Type}</h2> */}
                </div>
              </Popup>
            </Marker>
          );
        })}      
        </MapContainer>
    )
}