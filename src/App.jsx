import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { updateTimeline } from './components/Map/createTimeline';

import Header from './components/Header/Header';
import mapService from './services/map.service';
import './App.css';
import EditPage from './pages/EditPage';
import LandingPage from './pages/LandingPage';
import PlacesPage from './pages/PlacesPage';

function App() {
  const [allLocations, setAllLocations] = useState([]);
  const [visibleLocations, setVisibleLocations] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // listen for new locations, they will arrive here when we load a file
    mapService.locations$.subscribe((locations) => {
      if (locations.length > 0) {
        updateTimeline(locations);
        setAllLocations(locations);
      }
    });

    mapService.visibleLocations$.subscribe((locations) => {
      setVisibleLocations(locations);
    });

    mapService.places$.subscribe((places) => {
      setPlaces(places);
      mapService.save();
    });

    // for now always load saved state, in the future only do this if user is visiting their own URL?
    mapService.loadSavedState();
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/edit">
          <EditPage locations={visibleLocations} allLocations={allLocations} />
        </Route>
        {/* <Route path="/remove">
          <RemovePage locations={visibleLocations} allLocations={allLocations} />
        </Route>
        <Route path="/import">
          <ImportPage />
        </Route> */}
        <Route path="/places">
          <PlacesPage places={places} />
        </Route>
        <Route path="/:uuid?">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
