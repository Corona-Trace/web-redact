import mapService from '../../services/map.service';

import { addMarker } from './addMarkers';

/*global L*/
export default (mapRef, markerGroupRef, latlng) => {
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

  function onMapClick(e) {
    // TODO implement add marker
    // TODO only allow this on add page
    // const mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(mapRef.current);
    // mp.bindPopup(
    //   '<a style="cursor:pointer" onclick=\'removeMarker("' +
    //     mp._leaflet_id +
    //     '")\'>{{ i18n "remove" }}</a>',
    // );
    // markers[mp._leaflet_id] = mp;
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
