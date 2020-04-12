export interface IJsonData {
  locations?: any;
  timelineObjects?: any;
}

export interface ILocation {
  latitudeE7: string;
  longitudeE7: string;
  timestampMS?: number;
}
