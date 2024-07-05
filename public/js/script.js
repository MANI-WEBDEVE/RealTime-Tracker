console.log(
  navigator.geolocation.watchPosition((position) => {
    let { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  })
);

let socket = io();
console.log("hello");

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { longitude, latitude });
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0,
    }
  );
} else {
  console.log(`some want wrong `);
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  
//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  //https://tile.openstreetmap.org/{z}/{x}/{y}.png
  attribution: "OpenStreetMap",
}).addTo(map);

let myIcon = L.icon({
  iconUrl: "./img/loca.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48], // Center bottom of the icon
  popupAnchor: [0, -48], // Center top of the icon for the popup
});

const marker = {};

socket.on("recieve-location", function (data) {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude], 10);
  if (marker[id]) {
    marker[id].setLatLng([latitude, longitude]);
  } else {
    marker[id] = L.marker([latitude, longitude], { icon: myIcon }).addTo(map);
  }
});

socket.on("user-disconnect", function (id) {
  if (marker[id]) {
    map.removeLayer(marker[id]);
    delete marker[id];
  }
});
