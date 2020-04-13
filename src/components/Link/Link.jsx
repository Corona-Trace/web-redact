import React from 'react';
import styled from 'styled-components';

const A = styled.a`
  background: none;
  border-bottom: 3px solid rgb(28, 184, 65);
  color: inherit;
  text-decoration: none;
  &:hover {
    background: rgb(28, 184, 65);
    border-bottom: none;
    cursor: pointer;
    padding: 2px;
  }
`;

function Link({ children, href }) {
  return (
    <A href={href} target="_blank">
      {children}
    </A>
  );
}

export default Link;
