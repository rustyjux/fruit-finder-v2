import { useState, useRef, useMemo, useCallback } from "react"
import { Marker } from "react-leaflet"
  
export default function DraggableMarker({ draggablePosition, setDraggablePosition }) {
    const [draggable, setDraggable] = useState(true)
    
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
                const markerLatLng = marker.getLatLng()
                setDraggablePosition({
                    lat: Math.round(markerLatLng.lat * 100000) / 100000,
                    lng: Math.round(markerLatLng.lng * 100000) / 100000
                })
            }
        },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Marker
        draggable={draggable}
        autoPan={true}
        autoPanSpeed={3}
        eventHandlers={eventHandlers}
        position={draggablePosition}
        ref={markerRef}>
        </Marker>
    )
    }