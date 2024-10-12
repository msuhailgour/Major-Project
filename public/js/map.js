mapboxgl.accessToken = mapToken;
const coordsArray = coordinates.split(",").map(Number); // Converts string to array of numbers

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/satellite-streets-v12",
  center: coordsArray, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordsArray)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      "<p>Exact Location Provided after booking</p>"
    )
  )
  .addTo(map);
