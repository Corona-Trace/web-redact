# Built with

Built with [Create React App](CRA.md), React Hooks, RxJS and Leaflet.

Leaflet are included as script / style tags in head in `index.html`.
I've used this approach as I had some issues getting Leaflet to work when I tried import npm installed modules.

# Google Take Out Data

For many people the default Google Take Out Data will be huge - mine for example is 130MB for 4 years of data.
The aim is for users to edit data locally before they send to our servers, but the limit for Local Storage is 10MB.

Therefore, instead, we should get the user to import just the data for specific months e.g. January and onwards.
The size of these files is much more manageable and easily within the limits of local storage.
This also reinforces that we only want data for the purposes of COVID-19.

The JSON structure for the monthly files is slighty different. The code will support both.

# General Code Structure

- Pages act as the root of each route (page!)
- Components are used to construct pages
- Services contain the majority of the logic.

## Map.Service

This is the core service.
It's responsible for orchestrating other services and saving / loading data.
When new data is loaded we emit it on the locations$ and places$ observables.
The App.jsx components observces these obserables and passes any new data down the tree to other components.

## Location.Service

This contains the logic for extracting location data from the GTO file.
We extract latlng and a timestamp and genearte a unique key.

## Places.Service

Very similar to location.service, but it extracts more detailed place data.
We ony extract data that has a high confidence.
There is now way I can see to easily distinguish between residential and business premises.
However each place has a placeId, which we might be able to send to the placesAPI to get more detailed info.

## File.Service

Loads data from GTO into the app.

## Saving / Loading

Currently we just save data to Local Storage.
When the app is loaded, we check local storage for data and load any found.
When the user deletes items they are not curently saved straigh away - they need to press save.
Thinking about it, we should probably just save data automatically; when a file is loaded and when locations are deleted.

# Limitations

- Currently only one month (GTO file) can be loaded at time; loading another month erases previous data.
  This will be first thing to fix.
- It's not possible to undo deleting of information

# Useful Links

- https://leafletjs.com/
- http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
