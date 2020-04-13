import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import createMap from './createMap';
import { createTimeline } from './createTimeline';
import addMarkers from './addMarkers';

const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

function Map({ latlng, locations }) {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // this effect initialiases the map
    createMap(mapRef, latlng);
    createTimeline(mapRef, []);
  }, []);

  useEffect(() => {
    // this effect responds to the loading of new locations
    const markers = addMarkers(markerGroupRef, locations);

    // TODO make this smarter, pan to center of markers
    if (initialLoad) {
      setInitialLoad(false);

      if (markers.length > 0) {
        mapRef.current.panTo(markers[0].getLatLng());
      }
    }
  }, [locations]);

  return (
    <MapContainer>
      <div id="map" />
    </MapContainer>
  );
}

export default Map;
