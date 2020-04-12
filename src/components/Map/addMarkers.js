// this file is JS because I could not get leaflet to work with TS
import mapService from '../../services/map.service';

/*global L*/

const IconStyleSelected = L.icon({
  iconUrl: './marker-icon-selected.png',
});

const IconStyleNew = L.icon({
  iconUrl: './marker-icon-new.png',
});

export const addMarker = (markerGroupRef, loc) => {
  const mp = new L.marker([loc.latitudeE7, loc.longitudeE7]).addTo(markerGroupRef.current);
  if (loc.remove) {
    mp.setIcon(IconStyleSelected);
  } else if (loc.add) {
    mp.setIcon(IconStyleNew);
  }
  mp.id = loc.id;
  return mp;
};

export default (markerGroupRef, locations) => {
  const mapRef = mapService.getMapRef();
  const markers = [];

  if (!markerGroupRef.current) {
    markerGroupRef.current = new L.LayerGroup().addTo(mapRef.current);
    mapService.setMarkerGroupRef(markerGroupRef);
  } else {
    markerGroupRef.current.clearLayers();
  }

  locations.forEach((loc) => {
    const mp = addMarker(markerGroupRef, loc);
    markers.push(mp);
  });

  return markers;
};
