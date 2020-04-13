import React, { useEffect } from 'react';
import styled from 'styled-components';

import mapService from '../services/map.service';
import Button from '../components/Button/Button';
import Map from '../components/Map/VanillaMap';
import Sidebar from '../components/Sidebar/Sidebar';

const Container = styled.div`
  display: flex;
`;

export default function RemovePage({ allLocations, locations }) {
  useEffect(() => {
    // for now always load saved state, in the future only do this if user is visiting their own URL?
    mapService.loadSavedState();
  }, []);

  const noneToDelete = locations.filter((l) => l.remove === true).length === 0;

  const button = (
    <Button color={'#dd514c'} disabled={noneToDelete} onClick={() => mapService.deleteSelected()}>
      Delete
    </Button>
  );

  return (
    <Container>
      <Map latlng={{ lat: -41.284946, lng: 173.1960541 }} locations={locations} />
      <Sidebar allLocations={allLocations} locations={locations}>
        {button}
      </Sidebar>
    </Container>
  );
}
