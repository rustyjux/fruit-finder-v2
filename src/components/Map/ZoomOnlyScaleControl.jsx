import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import './ZoomOnlyScaleControl.css'; // We'll create this CSS file

const ZoomOnlyScaleControl = (props) => {
  const map = useMap();
  const scaleControlRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    if (!scaleControlRef.current) {
      scaleControlRef.current = new L.Control.Scale({ ...props }).addTo(map);
    }

    const scaleControlElement = scaleControlRef.current.getContainer();

    // Add a class to the scale control element
    scaleControlElement.classList.add('zoom-scale-control');

    const showScale = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      scaleControlElement.classList.remove('fade-out');
      scaleControlElement.classList.add('fade-in');
    };

    const hideScale = () => {
      hideTimeoutRef.current = setTimeout(() => {
        scaleControlElement.classList.remove('fade-in');
        scaleControlElement.classList.add('fade-out');
      }, 3000);
    };

    map.on('zoomstart', showScale);
    map.on('zoomend', hideScale);

    // Initially hide the scale control
    hideScale();

    return () => {
      map.off('zoomstart', showScale);
      map.off('zoomend', hideScale);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [map, props]);

  return null;
};

export default ZoomOnlyScaleControl;