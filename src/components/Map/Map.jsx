import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import { collection, onSnapshot, query, limit, where } from 'firebase/firestore';
import { db } from "../../utils/firebase";

import './Map.css';
import treeData from "../../test-data/tree-data.json";
import { appleLIcon } from './MapIcons';
import TreeMarker from './TreeMarker';
import DraggableMarker from "./DraggableMarker";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
// Get only actual tree points, not comments
const treeItems = treeData.features.filter(tree => tree.geometry);

const { BaseLayer } = LayersControl

export default function Map({ 
  activeTree, 
  makeActiveTree, 
  zoomSetting, 
  initialMapCenter, 
  mapSize, 
  setMapCenter,
  draggablePosition,
  setDraggablePosition
  }) {  
  const [map, setMap] = useState(null);
  const [trees, setTrees] = useState([])
  const firebaseCollection = process.env.FIREBASE_COLLECTION
  const treesCollectionRef = collection(db, firebaseCollection);
  
  const canvasRenderer = L.canvas({ tolerance: 5 })

  // Retrieve trees from Firestore
  useEffect(() => {
    const queryTrees = query(
      treesCollectionRef,
      where("new", "==", true),
      limit(50)
      );
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

  useEffect(() => {
    const onMove = () => {
      if (map) {
        const center = map.getCenter();
        setMapCenter({
          lat: Math.round(center.lat * 100000) / 100000,
          lng: Math.round(center.lng * 100000) / 100000
        })
      }
    };

    if (map) {
      map.on('moveend', onMove);
    }
    // return () => {
    //   if (map) {
    //     map.off('movestart', onMove);
    //   }
    // }
  }, [map, setMapCenter])

  return (
    <div className={`map-container map-container--${mapSize}`}>
      <MapContainer 
        renderer={canvasRenderer}
        preferCanvas={true}
        center={initialMapCenter} 
        zoom={zoomSetting} 
        scrollWheelZoom={true} 
        ref={setMap}
      >
      <LayersControl position="topleft">
        <BaseLayer checked name="Streets">
          <TileLayer
          // zoomOffset={1}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url={`https://api.mapbox.com/styles/v1/rustyjux/clny3ijlz003j01mvbr8xeqrc/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
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
      {/* {activeTree=="new-tree" ? <Marker position={map.getCenter()}/> : null} */}
      {activeTree=="new-tree" ? 
        <DraggableMarker 
          startPosition={map.getCenter()}
          draggablePosition={draggablePosition}
          setDraggablePosition={setDraggablePosition}
        /> : null}
      </MapContainer>

      {/* <div className="display-position" style={{zIndex: 1001}}>
        HELLO
        {map ? <DisplayPosition map={map} /> : null}
      </div> */}
      
    </div>
  )
}