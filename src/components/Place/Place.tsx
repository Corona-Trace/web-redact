import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  border: 1px solid #666;
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
  margin-right: 4px;
  padding: 8px;
`;

function Place({ place }) {
  const date = new Date(Number(place.timestampMs)).toLocaleString();
  return (
    <Box>
      <b>{place.name}</b>
      <div>{place.address}</div>
      <div>{date}</div>
    </Box>
  );
}

export default Place;
