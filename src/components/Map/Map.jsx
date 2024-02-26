import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { db } from "../../utils/firebase";

import './Map.css';
import treeData from "../../test-data/tree-data.json";
import { appleLIcon } from './MapIcons';
import TreeMarker from './TreeMarker';

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
// Get only actual tree points, not comments
const treeItems = treeData.features.filter(tree => tree.geometry);

const { BaseLayer } = LayersControl

export default function Map({ activeTree, makeActiveTree, zoomSetting, mapCenter, mapSize }) {  
  const [map, setMap] = useState(null);
  const [trees, setTrees] = useState([])
  const treesCollectionRef = collection(db, "tree-features");

  // Retrieve trees from Firestore
  useEffect(() => {
    const queryTrees = query(treesCollectionRef, limit(10));
    // const queryTrees = query(treesCollectionRef, where("userDisplayName", "==", "Russell Vinegar"));
    const unsubscribe = onSnapshot(queryTrees, (snapshot) => {
      let firestoreTrees = [];
      snapshot.forEach((doc) => {
        firestoreTrees.push({...doc.data(), id: doc.id });
        // console.log('record update fetched')
      })
      setTrees(firestoreTrees);
      // console.log('state updated')
    });

    return () => unsubscribe();
  }, [])

  // Zoom to current location
  // useEffect(() => {
  //   if (map) {
  //     map.locate({
  //         setView: true
  //     });
      
  //   }
  // }, [map]);

  return (
    <div className={`map-container map-container--${mapSize}`}>
      <MapContainer 
        center={mapCenter} 
        zoom={zoomSetting} 
        scrollWheelZoom={true} 
        ref={setMap}>
      <LayersControl position="topleft">
        <BaseLayer checked name="Streets">
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url={`https://api.mapbox.com/styles/v1/rustyjux/clny3ijlz003j01mvbr8xeqrc/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
          // url={`https://api.mapbox.com/styles/v1/rustyjux/clt24k95b007101ragek5gbkb/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
          />
        </BaseLayer>
        <BaseLayer name="Satellite">
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url={`https://api.mapbox.com/styles/v1/rustyjux/clt24t9iz007v01py51n2c7gc/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
          />
        </BaseLayer>
      </LayersControl>

      {trees.map(tree => (
        <TreeMarker key={tree.id} tree={tree} makeActiveTree={makeActiveTree} activeTree={activeTree} />
      ))}      

      </MapContainer>
    </div>
  )
}