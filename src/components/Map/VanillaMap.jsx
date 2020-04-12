import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import mapService from '../../services/map.service';

import createMap from './createMap';
import createTimeline from './createTimeline'; // TODO does not work
import addMarkers from './addMarkers';

// TODO
// * count of deleted?
// * undo? - or just reset back to initial state?
// * add ability to add locations.

const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

function Map({ latlng, locations, mode = 'REMOVE' }) {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // this effect initialiases the map
    createMap(mapRef, latlng);
  }, []);

  useEffect(() => {
    // this effect responds to the loading of new locations
    const visibleLocations = locations.filter((l) => l.visible);

    const markers = addMarkers(markerGroupRef, visibleLocations);

    createTimeline(mapRef, locations);

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
