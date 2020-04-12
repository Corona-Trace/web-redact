import { v4 as uuidv4 } from 'uuid';

// this file is JS because I could not get leaflet to work with TS
import mapService from '../../services/map.service';
import { addMarker } from './addMarkers';

/*global L*/
export default (mapRef, latlng) => {
  mapService.init(mapRef, latlng);
  const drawControl = new L.Control.Draw({
    draw: {
      marker: false,
      polygon: false,
      polyline: false,
      rectangle: true,
      circle: {
        metric: 'metric',
      },
    },
    edit: false,
  });

  // this is used to see if markers are within drawn circle
  L.Circle.include({
    contains: function (latLng) {
      return this.getLatLng().distanceTo(latLng) < this.getRadius();
    },
  });

  // this is used to see if markers are within drawn rectangle
  L.Rectangle.include({
    contains: function (latLng) {
      return this.getBounds().contains(latLng);
    },
  });

  function isSliderClick(e) {
    // check to see if this click event originated on the timeline slider control
    if (e.originalEvent) {
      if (e.originalEvent.toElement) {
        if (e.originalEvent.toElement.className.indexOf('leaflet-control-layers') > -1) {
          return true;
        }
        if (e.originalEvent.toElement.className.indexOf('time-slider') > -1) {
          return true;
        }
      }
    }
    return false;
  }

  function isMarkerClick(e) {
    if (e.originalEvent) {
      if (e.originalEvent.toElement) {
        if (e.originalEvent.toElement.className.indexOf('leaflet-marker-icon') > -1) {
          return true;
        }
      }
    }
    return false;
  }

  function onMapClick(e) {
    if (isSliderClick(e) || isMarkerClick(e)) {
      return;
    }
    // TODO only allow this on add page
    const location = {
      id: uuidv4(),
      add: true,
      timestampMs: Date.now(),
      latitudeE7: e.latlng.lat,
      longitudeE7: e.latlng.lng,
    };
    addMarker(mapService.getMarkerGroupRef(), location);
    mapService.addLocation(location);
  }

  mapRef.current = L.map('map', {
    center: [latlng.lat, latlng.lng],
    zoom: 13,
    layers: [
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
  });

  mapRef.current.addControl(drawControl);

  /**
   * This handles the user selecting an area on the map
   */
  mapRef.current.on(L.Draw.Event.CREATED, (e) => {
    const markerGroupRef = mapService.getMarkerGroupRef();
    const locationIdsToRemove = [];
    markerGroupRef.current.eachLayer(function (marker) {
      if (e.layer.contains(marker.getLatLng())) {
        locationIdsToRemove.push(marker.id);
      }
    });
    mapService.markForRemoval(locationIdsToRemove);
  });

  mapRef.current.on('click', onMapClick);
};
