import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Location from './Location';
import Button from '../Button/Button';
import mapService from '../../services/map.service';

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

function Sidebar({ history, locations }) {
  const noneToDelete = locations.filter((l) => l.remove === true).length === 0;
  const sorted = locations.sort((a, b) => b.timestampMs - a.timestampMs);

  const onSave = () => {
    const uuid = mapService.save();
    history.push(`/${uuid}`);
  };

  return (
    <Wrapper>
      <Box>
        <Button
          color={'#dd514c'}
          disabled={noneToDelete}
          onClick={() => mapService.deleteSelected()}
        >
          Delete
        </Button>
        <Button onClick={onSave}>Save</Button>
      </Box>
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

export default withRouter(Sidebar);
