import React from 'react';
import styled from 'styled-components';
import Link from '../components/Link/Link';

const H2 = styled.h2`
  margin-bottom: 0;
  padding-left: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;

  > div {
    width: 48%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
`;

const P = styled.p`
  margin-top: 0;
  max-width: 800px;
`;

export default function LandingPage() {
  return (
    <>
      <H2>Google Take Out Location Redaction</H2>
      <Container>
        <div>
          <h3>What</h3>
          <P>
            This tool allows you to view your Google Take Out Location history and edit it. <br />
            You can remove locations from your history, or add in new locations.
          </P>

          <h3>Why</h3>
          <P>
            In times of the COVID-19 epidemic, most people can live their normal lives again as a{' '}
            <Link href="https://www.theguardian.com/world/2020/mar/13/who-urges-countries-to-track-and-trace-every-covid-19-case">
              trace, test, treat
            </Link>{' '}
            method is in place. Several Contact Tracing apps are being developed around the world
            which will inform you if you have crossed paths with an infected person. In order to do
            this, these app need to know your location. They can track this from the moment you
            install the app - but what about before you install the app?
          </P>
          <P>
            You can provide the app with your locaiton history by sharing your Google Take Out
            location history. This data is anonymised, but will likely show clusters of location
            markers around your house and other potential areas you'd rather not share.
          </P>

          <P>This tool allows you to remove any sensitive location data before you share it.</P>

          <P>The downloaded data contains a list of locations and timestamps only.</P>
        </div>
        <div>
          <h3>How</h3>

          <P>1) Download your Google Take Out Location History</P>
          <P>2) Import monthly files using the IMPORT GOOGLE TAKE OUT Button</P>
          <P>3) Drag the slider to view where you were on each day</P>
          <P>
            4) Use the Circle / Square map tool to select locations to remove - click DELETE to
            confirm removal
          </P>
          <P>5) Click the map to add locations - click ADD to confirm addition</P>
          <P>6) Click SAVE to download list of locations</P>

          <h3></h3>
        </div>
      </Container>
    </>
  );
}
