// INCOMPLETE!

import { Button } from "@/components/ui/button"
import { GeoJSON } from "react-leaflet";
import { db } from "@/utils/firebase";
// import { firestoreExport } from "node-firestore-import-export";
// import * as firebase from 'firebase-admin'

// console.log (firestoreExport)
export default function ExportGeoJSON() {
    const firebaseCollection = process.env.FIREBASE_COLLECTION

    function exportData() {
        // firestoreExport(firebaseCollection)
        // .then(data=>console.log(data))
        console.log('hi')
    }

    const exportDataAsGeoJSON = async () => {
        try {
            const querySnapshot = await db.collection(firebaseCollection).get();

            const features = querySnapshot.docs.map(doc => {
                const data = doc.data();
                // Assuming your Firestore documents have 'lng' and 'lat' fields
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [data.lng, data.lat]
                    },
                    properties: {
                        // Add any other properties you need from your Firestore document
                    }
                };
            });

            const myGeoJson = GeoJSON.parse(features, { Point: ['geometry.coordinates[0]', 'geometry.coordinates[1]'] });
            console.log('print:  ', myGeoJson)

            // Convert JSON to string
            const jsonString = JSON.stringify(myGeoJson);

            // Create a Blob object to save as a file
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Create a link element and click it to trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'exported_data.geojson';
            document.body.appendChild(link);
            link.click();

            // Clean up
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting data as GeoJSON:', error);
        }
    };

    return (
        <Button onClick={exportData}>Export as GeoJSON</Button>
    );
}
