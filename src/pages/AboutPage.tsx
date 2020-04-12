import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export default function AboutPage() {
  return (
    <Container>
      <h2>About COVID-19 Tracing</h2>

      <p>
        In times of the COVID-19 epidemic, most people can live their normal lives again as a trace,
        test, treat method is in place.
      </p>

      <p>
        This site allows you to submit locations you have visited to the Corona Contact Tracing App.
      </p>

      <h3>Privacy</h3>
      <p>Privacy Notes here... </p>
    </Container>
  );
}
