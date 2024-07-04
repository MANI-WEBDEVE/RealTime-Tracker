- check if the browser supports geolocation?

- set options for high accuracy, a 5-second timeout, and no caching.

- use watch Position to track the users location continously.

- Emit the latitude and longitude via a socket with *send-location*. Log any Error to the consoele

- Intialize a map centered at coordinates (0,0) with a zoom level of 15 using leaflet. Add OpenStreetMap titles to the map 

- Create an empty object markers 
 
- When receiving location data via the socket, extract id,  latitude, and center the map on the new coordinates.

- If a marker for the id exists, update its position , other wise, create a new marker at the given coordiantes and add it to the map. When a user disconnected , remove their marker from the map and delete it from marker
