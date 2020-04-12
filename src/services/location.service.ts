import { v4 as uuidv4 } from 'uuid';

import { IJsonData } from '../interfaces';

/**
 * This method extracts location data from a Google Takeout JSON file
 * @param {*}  jsonData
 * @param {*}  startTimestampMs - start of period to extract data for
 * @param {*}  endTimestampMs - end of period to extract data for
 */
function extractLocations(jsonData: IJsonData, startTimestampMs: number, endTimestampMs: number) {
  let locations;
  if (jsonData.locations) {
    locations = getTimestampsFromLocationHistory(jsonData, startTimestampMs, endTimestampMs);
  } else {
    locations = getTimestampsFromSemanticLocationHistory(
      jsonData,
      startTimestampMs,
      endTimestampMs,
    );
  }
  return locations;
}

function getTimestampsFromLocationHistory(locationData, startTimestampMs, endTimestampMs) {
  const filteredLocations: any[] = [];
  locationData.locations.forEach((loc) => {
    if (loc.timestampMs <= endTimestampMs && loc.timestampMs >= startTimestampMs) {
      filteredLocations.push(loc);
    }
  });
  return filteredLocations;
}

function getWaypoints(activitySegment) {
  if (activitySegment.waypointPath) {
    return activitySegment.waypointPath.waypoints;
  } else if (activitySegment.simplifiedRawPath) {
    return activitySegment.simplifiedRawPath.points;
  } else {
    return [];
  }
}

function getTimestampsFromSemanticLocationHistory(locationData, startTimestampMs, endTimestampMs) {
  const filteredLocations: any[] = [];
  locationData.timelineObjects.forEach((loc, lidx) => {
    if (loc.activitySegment) {
      // will have a duration.startTimestampMs and  duration.endTimestampMs
      // will have one or more waypoints
      // if duration.startTimestampMs and  duration.endTimestampMs falls within our search frame add waypoints to locations
      // for timeline we'll need a timestemp too
      const duration = loc.activitySegment.duration;
      const inTimeFrame = isInTimeFrame(
        Number(duration.startTimestampMs),
        Number(duration.endTimestampMs),
        startTimestampMs,
        endTimestampMs,
      );
      if (inTimeFrame) {
        const waypoints = getWaypoints(loc.activitySegment);
        waypoints.forEach((waypoint, widx) => {
          filteredLocations.push({
            id: uuidv4(), //`${lidx}_${widx}_${duration.startTimestampMs}`,
            timestampMs: duration.startTimestampMs,
            latitudeE7: waypoint.latE7 / 1e7,
            longitudeE7: waypoint.lngE7 / 1e7,
          });
        });
      }
    }

    if (loc.placeVisit) {
      // will have a duration.startTimestampMs and  duration.endTimestampMs
      // will have  a location
      // if duration.startTimestampMs and  duration.endTimestampMs falls within our search frame add location to locations
      const duration = loc.placeVisit.duration;
      const inTimeFrame = isInTimeFrame(
        Number(duration.startTimestampMs),
        Number(duration.endTimestampMs),
        startTimestampMs,
        endTimestampMs,
      );
      if (inTimeFrame) {
        const location = loc.placeVisit.location;
        filteredLocations.push({
          id: uuidv4(), //`place_${duration.startTimestampMs}`,
          timestampMs: duration.startTimestampMs,
          latitudeE7: location.latitudeE7 / 1e7,
          longitudeE7: location.longitudeE7 / 1e7,
        });
      }
    }
  });
  return filteredLocations;
}

function isInTimeFrame(startTimestampMs, endTimestamp, startDate, endDate) {
  if (startTimestampMs >= startDate && endTimestamp <= endDate) {
    return true;
  }
  return false;
}

export default {
  extractLocations,
};
