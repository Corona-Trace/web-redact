import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

import mapService from '../../services/map.service';

const Wrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
`;

function ShowAllButton() {
  const [showAll, setShowAll] = useState(mapService.getShowAll());

  useEffect(() => {
    mapService.showAll$.subscribe((showAll) => {
      setShowAll(showAll);
    });
  }, []);

  const label = showAll ? 'Show Timeline' : 'Show All';

  const onClick = () => {
    mapService.toggleShowAll();
  };
  return (
    <Wrapper>
      <Button onClick={onClick}>{label}</Button>
    </Wrapper>
  );
}

export default ShowAllButton;
