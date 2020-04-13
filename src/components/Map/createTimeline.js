import mapService from '../../services/map.service';

/*global L*/
function createTimeline(mapRef) {
  if (!mapService.getSliderControl()) {
    const slider = L.timelineSliderControl({
      formatOutput: function (date) {
        return new Date(date).toString();
      },
    });

    mapRef.current.addControl(slider);
    mapService.setSliderControl(slider);
  }
}

function removeTimeline(mapRef) {
  const slider = mapService.getSliderControl();
  const timeline = mapService.getTimeline();

  if (timeline) {
    timeline.removeFrom(mapRef.current);
    mapService.setTimeline(null);
  }
  if (slider) {
    mapRef.current.removeControl(slider);
    mapService.setSliderControl(null);
  }
}

/**
 * It does not appear possible to add data to an existing timeline.
 * Also  slider intervals are set when timeline added to it,
 * if initial state is empty slider has not times.
 * Therefore, each we get new data we need to create a new timeline.
 * @param {*} locations
 */
function updateTimeline(locations) {
  const mapRef = mapService.getMapRef();
  const timeline = mapService.getTimeline();
  const slider = mapService.getSliderControl();
  const data = convertLocationToTimelineData(locations);

  if (!mapRef) {
    return;
  }

  // store current slider time so we can restore it when we create the new timeline
  const currentSliderPosition = slider.time;
  if (timeline) {
    timeline.removeFrom(mapRef.current);
  }

  const newTimeline = L.timeline(data, {
    getInterval: getInterval,
  });
  newTimeline.addTo(mapRef.current);
  newTimeline.on('change', function (e) {
    onTimelineChanged(e.target);
  });

  slider.addTimelines(newTimeline);
  if (currentSliderPosition) {
    slider.setTime(currentSliderPosition);
  }

  mapService.setTimeline(newTimeline);
}

function onTimelineChanged(timeline) {
  const displayed = timeline.getLayers();
  mapService.filterLocationsByTime(displayed);
}

function convertLocationToTimelineData(locations) {
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
}

function getInterval(data) {
  return {
    start: data.properties.start,
    end: data.properties.end,
  };
}
export { createTimeline, removeTimeline, updateTimeline };
