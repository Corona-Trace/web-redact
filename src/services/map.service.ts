import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import locationService from './location.service';
import localStorageService from './localStorage.service';
import placesService from './places.service';

const _locations = new BehaviorSubject<any[]>([]);
const _places = new BehaviorSubject<any[]>([]);

// TODO  needs to be configurable
const startDate = new Date(2020, 0, 1, 0, 0, 0); // month is zero based
const endDate = new Date(2020, 3, 30, 0, 0, 0); // month is zero based
const startTimestampMs = startDate.getTime();
const endTimestampMs = endDate.getTime();

function loadSavedState() {
  // for now we just load whatever is in localstorage
  // in the future we might instead load this from the server using a unique ID that allows the user to edit etc
  const uuid = localStorageService.getItem('uuid');
  if (uuid) {
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
}

/**
 * Save the current state to local storage
 */
function save() {
  let uuid;
  if (!localStorageService.getItem('uuid')) {
    uuid = uuidv4();
    localStorageService.setItem('uuid', uuid);
  }
  localStorageService.setItem('locations', _locations.value);
  localStorageService.setItem('places', _places.value);

  return uuid;
}

function addLocations(data) {
  const locations = locationService.extractLocations(data, startTimestampMs, endTimestampMs);
  _locations.next(locations);
}

function addPlaces(data) {
  const places = placesService.extractPlaces(data, startTimestampMs, endTimestampMs);
  _places.next(places);
}

function markForRemoval(ids) {
  const updateLocations = _locations.value;

  ids.forEach((idToRemove) => {
    const index = updateLocations.findIndex((c: any) => c.id === idToRemove);
    if (index > -1) {
      //@ts-ignore
      updateLocations[index].remove = true;
    }
  });
  _locations.next([...updateLocations]);
}

function deleteSelected() {
  const currentLocations = _locations.value;
  const withoutDeleted = currentLocations.filter((l: any) => l.remove !== true);
  _locations.next(withoutDeleted);
}

const service = {
  addLocations,
  addPlaces,
  deleteSelected,
  loadSavedState,
  markForRemoval,
  save,
  locations$: _locations.asObservable(),
  places$: _places.asObservable(),
};

export default service;
