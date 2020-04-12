import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export default function LandingPage() {
  return (
    <Container>
      <h2>COVID-19 Contact Tracing</h2>
      <p>
        Even if you are not COVID-19 positive your anonymous data can help us contain this threat.
      </p>

      <h3>How to share your data</h3>
      <p>Either add notes directly here or direct to another page?</p>
    </Container>
  );
}
