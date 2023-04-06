<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
     integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
     crossorigin=""></script>

// seteamos el mapa en las coordenadas
     var map = L.map('map').setView([51.505, -0.09], 13);

     // añadir circulos o marcadores al mapa
     var marker = L.marker([51.5, -0.09]).addTo(map);

     var circle = L.circle([51.508, -0.11], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
     }).addTo(map);



    var polygon = L.polygon([
               [51.509, -0.08],
               [51.503, -0.06],
               [51.51, -0.047]
          ]).addTo(map);


// poner mensajes pops en los puntos de arriba
          marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
          circle.bindPopup("I am a circle.");
          polygon.bindPopup("I am a polygon.");



     // llamamos al mapa de openstreetmap
     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);

// para funciones en el mapa
     function onMapClick(e) {
          alert("You clicked the map at " + e.latlng);
      }
      
      map.on('click', onMapClick);


     // Para saber la ubicacion donde sucedio la accion o el click
     // con la funcion "LatLng"

     var popup = L.popup();

     function onMapClick(e) {
     popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
     }

     map.on('click', onMapClick);






















