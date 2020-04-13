import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { updateTimeline } from './components/Map/createTimeline';

import Header from './components/Header/Header';
import mapService from './services/map.service';
import './App.css';
import AddPage from './pages/AddPage';
import ImportPage from './pages/ImportPage';
import LandingPage from './pages/LandingPage';
import PlacesPage from './pages/PlacesPage';
import RemovePage from './pages/RemovePage';

function App() {
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // listen for new locations, they will arrive here when we load a file
    mapService.locations$.subscribe((locations) => {
      if (locations.length > 0) {
        updateTimeline(locations);
        mapService.save();
      }
    });

    mapService.visibleLocations$.subscribe((locations) => {
      setLocations(locations);
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
        <Route path="/add">
          <AddPage locations={locations} />
        </Route>
        <Route path="/remove">
          <RemovePage locations={locations} />
        </Route>
        <Route path="/import">
          <ImportPage />
        </Route>
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
