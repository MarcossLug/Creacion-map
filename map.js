// llamamos al tiles y lo definimos a una variable {s}
const tilesProvider='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png '

// definimos myMap y le asignamos a nuestro id='myMap' y seteamos las coordenadas .setView(latitud,longitud], zoom inicial)
let myMap =L.map('myMap').setView([51.505,-0.09],13)

// lo agregamos al div con .addTo(myMap)
L.tileLayer(tilesProvider,{
    maxZoom:18,
}).addTo(myMap)

let marker =L.marker([51.505,-0.09]).addTo(myMap)

let iconMarker =L.icon({
    iconUrl:'puntero.png',
    iconSize: [60,60],
    // iconAnchor = para posicionarnos en la base del puntero, asi indica la base el lugar y no la imagen entera
    iconAnchor: [30,60],
})
// para definir otro marcador pero ya llamamos la variable iconMarker ya definida con los seteos de tamaño y ancho
let marker2 = L.marker([51.51,-0.09], {icon:iconMarker} ).addTo(myMap)

// para desactivar el zoom por doble click
myMap.doubleClickZoom.disable()

// funcion de doble click para que diga la ubicacion donde se hizo el doble click
myMap.on('dblclick', e=> {
    let latLng = myMap.mouseEventToLatLng(e.originalEvent)
    //                                                                          variabla.lat =         variable.lng = 
    // envase a lo que marque el doble click, manda las coordenadas al marcador (([latLng.lat(latitud) , latLng.lng(longitud)])
    L.marker([latLng.lat,latLng.lng], {icon:iconMarker}).addTo(myMap)
    console.log(latLng)
})

// para la geolocalizacion del usuario que esta viendo la pagina
navigator.geolocation.getCurrentPosition(
    // para la posicion
    (pos)=>{
        const {coords} =pos
        console.log(coords)
        L.marker([coords.latitude,coords.longitude], {icon: iconMarker}).addTo(myMap)
    },
    // por si hay un error
    (err)=>{
        console.log(err)
    },

    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0 
    }
)

// un mapa que se vaya actualizando segundo a segundo, para traquear posicion

let iconMarker2 =L.icon({
    iconUrl:'airplane.png',
    iconSize: [64,64],
    // iconAnchor = para posicionarnos en la base del puntero, asi indica la base el lugar y no la imagen entera
    iconAnchor: [32,32],
})


// agrego el Layer de la web
const urlOpenLayers = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png '
// lo añado a mi mapa
L.tileLayer(urlOpenLayers,{
    maxZoom: 15
}).addTo(myMap)


// defino afuera la variable del markador para que no aparezca cada 1seg en el mapa
let markerAirPlane = null

const updateMap=()=>{
    //llamo desde la api la informacion para la posicion
    const urlIss = 'http://api.open-notify.org/iss-now.json'
    fetch(urlIss)
        .then(res=>res.json())
        .then(data =>{
            // creo un if para el marker que va a dar true porque existe el marker, lo va a borrar, sale de la condicion y lo vuelve a crear
            // asi no añade al mapa cada segundo, y va borrando la posicion anterior 
            if(markerAirPlane){
                myMap.removeLayer(markerAirPlane)
            }
            // de data saco la latitud y la longitud
            const { latitude,longitude}=data.iss_position
            console.log(latitude,longitude)
            markerAirPlane=L.marker([latitude,longitude],{icon: iconMarker2}).addTo(myMap)
    })
    // seteamos el bucle para que vaya llamando updateMap cada 1000milesimas=1seg
    setTimeout(updateMap,1000)
}
// llamo la funcion updateMap de arriba
updateMap()





