/*global L*/
export default (mapRef, locations) => {
  if (locations.length === 0) {
    return;
  }
  const convertLocationToTimelineData = function (locations) {
    return [
      {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              start: '1970-01-01',
              end: '2014-12-04',
            },
            geometry: {},
          },
        ],
      },
    ];
  };

  const data = convertLocationToTimelineData(locations);

  const getInterval = function (location) {
    // location data only has a timestampe, so we'll use that as a "start"
    // and the "end" will be that + 1000
    return {
      start: location.timestampMs,
      end: location.timestampMs + 1000,
    };
  };

  const timelineControl = L.timelineSliderControl({
    formatOutput: function (date) {
      return new Date(date).toString();
    },
  });

  // !TODO tiemline errors here during construction
  const timeline = L.timeline(data, {
    getInterval: getInterval,
    pointToLayer: function (location, latlng) {
      console.log(location);
      console.log(latlng);
    },
  });

  timelineControl.addTo(mapRef.current);
  timelineControl.addTimelines(timeline);
  timeline.addTo(mapRef.current);
};
