

console.log("hello");

let socket = io();

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
        enableHighAccuracy:true,
        timeout: 10000,
        maximumAge: 0
    }
  );
} else {
  console.log(`some want wrong `);
}

const map = L.map('map').setView([0 , 0], 20)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
}).addTo(map)

const marker = {}

socket.on('recieve-location', function(data){
    const {id, latitude, longitude} = data
    map.setView([latitude, longitude],15)
    if(marker[id]){
        marker[id].setLatLng([latitude, longitude])
    } else {
        marker[id] = L.marker([latitude, longitude]).addTo(map)
    }
})

socket.on('user-disconnect', function(id) {
     if(marker[id]){
        map.removeLayer(marker[id]);
        delete marker[id]
     }
})