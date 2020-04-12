import mapService from '../../services/map.service';

/*global L*/
export default (mapRef, locations) => {
  if (locations.length === 0) {
    return;
  }
  const convertLocationToTimelineData = function (locations) {
    const features = locations.map((location) => {
      return {
        type: 'Feature',
        properties: {
          id: location.id,
          start: Number(location.timestampMs),
          end: Number(location.timestampMs) + 1000,
        },
        geometry: {
          type: 'Point',
          coordinates: [location.latitudeE7, location.longitudeE7],
        },
      };
    });

    return {
      type: 'FeatureCollection',
      features: features,
    };
  };

  const data = convertLocationToTimelineData(locations);

  const getInterval = function (data) {
    return {
      start: data.properties.start,
      end: data.properties.end,
    };
  };

  function onTimelineChanged(timeline) {
    const displayed = timeline.getLayers();
    mapService.filterLocationsByTime(displayed);
  }

  if (!mapService.getSliderControl()) {
    const slider = L.timelineSliderControl({
      formatOutput: function (date) {
        return new Date(date).toString();
      },
    });

    mapRef.current.addControl(slider);
    mapService.setSliderControl(slider);

    const timeline = L.timeline(data, {
      getInterval: getInterval,
    });
    timeline.addTo(mapRef.current);
    slider.addTimelines(timeline);

    timeline.on('change', function (e) {
      onTimelineChanged(e.target);
    });
  }
};
