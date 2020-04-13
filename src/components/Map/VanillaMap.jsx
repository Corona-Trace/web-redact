import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import createMap from './createMap';
import { createTimeline, removeTimeline, updateTimeline } from './createTimeline';
import addMarkers from './addMarkers';
import ShowAllButton from './ShowAllButton';

const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

function Map({ latlng, locations, showAll }) {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // this effect initialiases the map
    createMap(mapRef, latlng);
  }, []);

  useEffect(() => {
    // this effect initialiases the timeline
    if (showAll) {
      removeTimeline(mapRef);
    } else {
      createTimeline(mapRef, []);
      updateTimeline(locations);
    }
  }, [showAll]);

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
      <ShowAllButton />
      <div id="map" />
    </MapContainer>
  );
}

export default Map;
