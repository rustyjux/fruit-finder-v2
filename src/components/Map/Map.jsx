import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { db } from "../../utils/firebase";

import './Map.css';
import treeData from "../../test-data/tree-data.json";
import { appleLIcon } from './MapIcons';
import TreeMarker from './TreeMarker';

// Get only actual tree points, not comments
const treeItems = treeData.features.filter(tree => tree.geometry);

export default function Map({ makeActiveTree, zoomSetting, mapCenter, mapSize }) {  
  const [map, setMap] = useState(null);
  // console.log(map)
  // useEffect(() => {
  //   if (map) {
  //     setTimeout(() => {}, 3000)
  //     console.log('zoom!')
  //     map.setZoom(17);
  //   }
  // }, [map]);
  console.log('map renders')
  const [trees, setTrees] = useState([])
  const treesCollectionRef = collection(db, "tree-features");

  useEffect(() => {
    const queryTrees = query(treesCollectionRef, limit(10));
    // const queryTrees = query(treesCollectionRef, where("userDisplayName", "==", "Russell Vinegar"));
    const unsubscribe = onSnapshot(queryTrees, (snapshot) => {
      let firestoreTrees = [];
      snapshot.forEach((doc) => {
        firestoreTrees.push({...doc.data(), id: doc.id });
        console.log('record update fetched')
      })
      setTrees(firestoreTrees);
      console.log('state updated')
    });

    return () => unsubscribe();
  }, [])

    return (
      <div className={`map-container map-container--${mapSize}`}>
        <MapContainer 
          center={mapCenter} 
          zoom={zoomSetting} 
          scrollWheelZoom={true} 
          ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://api.mapbox.com/styles/v1/rustyjux/clny3ijlz003j01mvbr8xeqrc/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnVzdHlqdXgiLCJhIjoiY2wxNTZ0ZmRxMHBvejNldjBvY2JpYTIzOCJ9.u3wYmClN0txsgeC9KM_HLw"
        />
  
        {trees.map(tree => (
          <TreeMarker key={tree.id} tree={tree} makeActiveTree={makeActiveTree} />
        ))}      

        </MapContainer>
      </div>
    )
}