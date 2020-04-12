import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';

import Header from './components/Header/Header';
import mapService from './services/map.service';
import './App.css';
import AddPage from './pages/AddPage';
import ImportPage from './pages/ImportPage';
import MapPage from './pages/MapPage';
import PlacesPage from './pages/PlacesPage';
import RemovePage from './pages/RemovePage';

function App() {
  const [locations, setLocations] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // listen for new locations, they will arrive here when we load a file
    mapService.locations$.subscribe((locations) => {
      setLocations(locations);
    });

    mapService.places$.subscribe((places) => {
      setPlaces(places);
    });
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/add">
          <AddPage />
        </Route>
        <Route path="/remove">
          <RemovePage />
        </Route>
        <Route path="/import">
          <ImportPage />
        </Route>
        <Route path="/places">
          <PlacesPage places={places} />
        </Route>
        <Route path="/:uuid?">
          <MapPage locations={locations} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
