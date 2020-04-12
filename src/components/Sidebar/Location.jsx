import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: ${(props) => (props.remove ? 'red' : props.add ? '#5eb95e' : '#666')};
  display: flex;
  margin-bottom: 1px;
  padding: 0px;
  font-size: 80%;
`;

function Location({ location }) {
  const date = new Date(Number(location.timestampMs)).toLocaleString();
  return (
    <Wrapper remove={location.remove} add={location.add}>
      {date}
    </Wrapper>
  );
}

export default Location;
