// NOT CURRENTLY IN USE
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { db } from "../utils/firebase"
import { onValue, ref } from "firebase/database";
import treeData from "../test-data/tree-data.json";

function Trees() {

  // Get the reference of the database.
  const treeRef = ref(db, 'features');

  onValue(treeRef, (snapshot) => {
    const data = snapshot.val();
    if( !!data ) {
      console.log(data);
    } else {
      console.log('Data not found');
    }  
  }, {
    onlyOnce: true
  });
}

export default Trees;
