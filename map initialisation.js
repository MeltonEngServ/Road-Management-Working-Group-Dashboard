// Define the Nearmap aerial layer
const nearMapAerialLayer = {
  id: 'Nearmap_Layer',
  source: 'Nearmap_Source',
  type: 'raster',
  paint: {
    'raster-opacity': ['interpolate', ['exponential', 1.5], ['zoom'], 15, 0, 17, 1],
  },
  layout: {
    visibility: 'visible',
  },
};

// Set up the Mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoibWVsdG9uZ2lzZGV2IiwiYSI6ImNtN2R6eGNxdjA4ZzcybXB4a2ZvYmxobjMifQ.ERlG4u3iz8HiKljoB92J3A';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/meltongisdev/cltp6z6ie01dk01raewq8b9ch', // Initial (Greyscale)
  center: [144.6261962, -37.712486],
  zoom: 11.5,
  pitch: 40,
  bearing: 5,
  transformRequest: (url, resourceType) => {
    if (
      resourceType === "Tile" &&
      url.indexOf("https://api.nearmap.com") > -1
    ) {
      console.log(url);
      return { url, referrerPolicy: "origin" };
    } else {
      return { url };
    }
  },
});

map.on('load', () => {
  // Add Nearmap source
  map.addSource('Nearmap_Source', {
    type: 'raster',
    tiles: ['https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=OWU2NDA3ZjktNzNiNi00YTFmLThkZDgtZGRhZjhlODFjM2Yw'],
    minzoom: 16,
    maxzoom: 22,
    bounds: [144.4667201638995, -37.81836486637397, 144.78127999196013, -37.54203040304009],
  });

  map.addLayer(nearMapAerialLayer);
});