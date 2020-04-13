import React from 'react';
import styled from 'styled-components';
import Place from '../components/Place/Place';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export default function PlacesPage({ places }) {
  return (
    <Container>
      <h2>Places</h2>
      <p>These are places you have visited. If you are infected you should inform them.</p>
      {places.map((place) => {
        return <Place key={place.placeId} place={place}></Place>;
      })}
    </Container>
  );
}
