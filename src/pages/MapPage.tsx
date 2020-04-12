import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import mapService from '../services/map.service';
import Map from '../components/Map/VanillaMap';
import Sidebar from '../components/Sidebar/Sidebar';

const Container = styled.div`
  display: flex;
`;

export default function MapPage({ locations }) {
  const { uuid } = useParams();

  useEffect(() => {
    // for now always load saved state, in the future only do this if user is visiting their own URL?
    mapService.loadSavedState();
  }, []);

  return (
    <Container>
      <Map latlng={{ lat: -41.284946, lng: 173.1960541 }} locations={locations} />
      <Sidebar locations={locations} />
    </Container>
  );
}
