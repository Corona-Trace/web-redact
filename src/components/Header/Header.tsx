import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import FileControl from '../FileControl/FileControl';
import mapService from '../../services/map.service';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0 16px;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
`;

const LinkButton = styled(NavLink)`
  color: #666;
  margin: 0 8px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    border-bottom: 3px solid rgb(28, 184, 65);
  }
  &.active {
    border-bottom: 3px solid rgb(28, 184, 65);
  }
`;

function Header() {
  const handleNewData = (data) => {
    mapService.addLocations(data);
    mapService.addPlaces(data);
  };
  return (
    <Wrapper>
      <LinkButton to="/" exact>
        Corona Trace
      </LinkButton>
      <ButtonContainer>
        <LinkButton to="/add">Add</LinkButton>
        <LinkButton to="/remove">Remove</LinkButton>
        <LinkButton to="/import">Import</LinkButton>
        <LinkButton to="/places">Places</LinkButton>
      </ButtonContainer>
      <div>
        <FileControl onFileLoaded={handleNewData} />
      </div>
    </Wrapper>
  );
}

export default Header;
