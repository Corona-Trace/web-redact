import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export default function HowToPage() {
  return (
    <Container>
      <h2>How to Upload your location history</h2>
      <p>
        Even if you are not COVID-19 positive your anonymous data can help us contain this threat
      </p>

      <p>Form and notes on how to upload</p>
    </Container>
  );
}
