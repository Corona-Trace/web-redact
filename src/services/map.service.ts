import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import locationService from './location.service';
import localStorageService from './localStorage.service';
import placesService from './places.service';

// master list of locations as loaded from GTO / added on map
const _locations = new BehaviorSubject<any[]>([]);
// list of locations visibile based on current timeline
const _visibleLocations = new BehaviorSubject<any[]>([]);
const _places = new BehaviorSubject<any[]>([]);

let _mapRef;
let _markerGroupRef;
let _latlng;
let _sliderControl;
let _timeline;

// TODO  needs to be configurable
const startDate = new Date(2020, 0, 1, 0, 0, 0); // month is zero based
const endDate = new Date(2020, 3, 30, 0, 0, 0); // month is zero based
const startTimestampMs = startDate.getTime();
const endTimestampMs = endDate.getTime();

/** store these items for future use */
function init(mapRef, latlng) {
  _mapRef = mapRef;
  _latlng = latlng;
}

function loadSavedState() {
  // for now we just load whatever is in localstorage
  // in the future we might instead load this from the server using a unique ID that allows the user to edit etc

  const savedLocations = localStorageService.getItem('locations');
  if (savedLocations) {
    const locations: any[] = savedLocations;
    _locations.next(locations);
  }

  const savedPlaces = localStorageService.getItem('places');
  if (savedPlaces) {
    const places: any[] = savedPlaces;
    _places.next(places);
  }
}

function filterLocationsByTime(locations) {
  const visibleIds = locations.map((location) => {
    return location.feature.properties.id;
  });

  const currentLocations = _locations.value;

  const visibleLocations = currentLocations.filter((location) => visibleIds.includes(location.id));

  _visibleLocations.next(visibleLocations);
}

/**
 * Save the current state to local storage
 */
function save() {
  if (_locations.value.length > 0) {
    localStorageService.setItem('locations', _locations.value);
  }
  if (_places.value.length > 0) {
    localStorageService.setItem('places', _places.value);
  }
}

function addLocation(loc) {
  const currentLocations = _locations.value;
  _locations.next([...currentLocations, loc]);
}

function addLocations(data) {
  const currentLocations = _locations.value;
  const locations = locationService.extractLocations(data, startTimestampMs, endTimestampMs);

  const combined = [...currentLocations, ...locations];

  _locations.next(removeDuplicates(combined, 'id'));
}

function addPlaces(data) {
  const currentPlaces = _places.value;
  const places = placesService.extractPlaces(data, startTimestampMs, endTimestampMs);
  const combined = [...currentPlaces, ...places];
  _places.next(removeDuplicates(combined, 'placeId'));
}

function markForRemoval(ids) {
  const currentLocations = _locations.value;

  const markedForRemoval = currentLocations.map((location) => {
    return {
      ...location,
      remove: ids.includes(location.id),
    };
  });
  _locations.next(markedForRemoval);
}

/**
 * Marks the locations the user selected for removal as deleted
 * These items no longer show up in the map or location list
 */
function deleteSelected() {
  const currentLocations = _locations.value;
  const withoutDeleted = currentLocations.filter((l: any) => l.remove !== true);
  _locations.next(withoutDeleted);
}

/**
 * Marks the locations the user selected for addition as added
 * These items will be saved
 */
function addSelected() {
  // for now we just remove the added flag so that the locations no longer appear new
  const currentLocations = _locations.value;

  const markAsAdded = currentLocations.map((location) => {
    if (location.add) {
      return {
        ...location,
        add: false,
      };
    }
    return location;
  });
  _locations.next(markAsAdded);
}

function removeDuplicates(array: any[], key: string) {
  // each place/location gets a unique ID when we extract it, use this
  return array.filter((v, i, a) => a.findIndex((t) => t[key] === v[key]) === i);
}

const service = {
  addLocation,
  addLocations,
  addSelected,
  addPlaces,
  deleteSelected,
  filterLocationsByTime,
  init,
  loadSavedState,
  markForRemoval,
  save,
  setMarkerGroupRef: (markerGroupRef) => {
    _markerGroupRef = markerGroupRef;
  },
  setSliderControl: (sliderControl) => {
    _sliderControl = sliderControl;
  },
  setTimeline: (timeline) => {
    _timeline = timeline;
  },
  locations$: _locations.asObservable(),
  visibleLocations$: _visibleLocations.asObservable(),
  places$: _places.asObservable(),
  getMapRef: () => _mapRef,
  getMarkerGroupRef: () => _markerGroupRef,
  getSliderControl: () => _sliderControl,
  getTimeline: () => _timeline,
};

export default service;
