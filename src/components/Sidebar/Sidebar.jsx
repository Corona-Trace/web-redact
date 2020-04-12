import React from 'react';
import styled from 'styled-components';

import Location from './Location';

const Box = styled.div`
  border: 1px solid #666;
  margin: 0 8px 8px 8px;
  overflow: hidden;
  padding: 16px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

//TODO make height responsive
const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 80vh;
  overflow-y: scroll;
`;

const P = styled.p`
  margin: 0 0 8px 0;
`;

function Sidebar({ children, locations }) {
  const sorted = locations.sort((a, b) => b.timestampMs - a.timestampMs);

  return (
    <Wrapper>
      <Box>{children}</Box>
      <Box>
        <LocationContainer>
          <P>{sorted.length} locations </P>
          {sorted.map((location, idx) => (
            <Location key={idx} location={location} />
          ))}
        </LocationContainer>
      </Box>
    </Wrapper>
  );
}

export default Sidebar;
