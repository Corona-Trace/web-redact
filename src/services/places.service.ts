import { IJsonData } from '../interfaces';

/**
 * This method extracts location data from a Google Takeout JSON file
 * @param {*}  jsonData
 * @param {*}  startTimestampMs - start of period to extract data for
 * @param {*}  endTimestampMs - end of period to extract data for
 */
function extractPlaces(jsonData: IJsonData, startTimestampMs: number, endTimestampMs: number) {
  const places = getTimestampsFromSemanticLocationHistory(
    jsonData,
    startTimestampMs,
    endTimestampMs,
  );

  return places;
}

function getTimestampsFromSemanticLocationHistory(locationData, startTimestampMs, endTimestampMs) {
  const filteredPlaces: any[] = [];
  locationData.timelineObjects.forEach((loc, lidx) => {
    if (loc.placeVisit) {
      const duration = loc.placeVisit.duration;
      const inTimeFrame = isInTimeFrame(
        Number(duration.startTimestampMs),
        Number(duration.endTimestampMs),
        startTimestampMs,
        endTimestampMs,
      );
      if (inTimeFrame) {
        if (loc.placeVisit.placeConfidence === 'HIGH_CONFIDENCE') {
          const existing = filteredPlaces.find(
            (p) => p.placeId === loc.placeVisit.location.placeId,
          );
          if (!existing) {
            filteredPlaces.push({
              placeId: loc.placeVisit.location.placeId,
              address: loc.placeVisit.location.address,
              name: loc.placeVisit.location.name,
              timestampMs: duration.startTimestampMs,
              latitudeE7: loc.placeVisit.location.latitudeE7 / 1e7,
              longitudeE7: loc.placeVisit.location.longitudeE7 / 1e7,
            });
          }
        }
      }
    }
  });
  return filteredPlaces;
}

function isInTimeFrame(startTimestampMs, endTimestamp, startDate, endDate) {
  if (startTimestampMs >= startDate && endTimestamp <= endDate) {
    return true;
  }
  return false;
}

export default {
  extractPlaces,
};
