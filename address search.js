// Add nav controls to the map
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

// Bind search box to area   
const bbox = [144.439004, -37.857166, 144.829723, -37.464500]; // [westLng, southLat, eastLng, northLat]

// Event listener for Search
const addressInput = document.getElementById('address');
const suggestionsDiv = document.getElementById('suggestions');

// Event listener for input changes
addressInput.addEventListener('input', function() {
    const query = this.value;

    if (query.length > 2) {
        const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?bbox=${bbox.join(',')}&access_token=${mapboxgl.accessToken}`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                suggestionsDiv.innerHTML = '';
                
                if (data.features && data.features.length > 0) {
                    suggestionsDiv.style.display = 'block'; 
                    data.features.forEach(feature => {
                        const suggestionItem = document.createElement('div');

                        // Set inline styles for the suggestion item
                        suggestionItem.textContent = feature.place_name; 
                        suggestionItem.style.cursor = 'pointer';
                        suggestionItem.style.padding = '5px';
                        suggestionItem.style.borderBottom = '1px solid #ddd'; 
                        suggestionItem.style.backgroundColor = 'white';
                        suggestionItem.style.transition = 'background-color 0.2s'; 

                        // Change background color on hover
                        suggestionItem.addEventListener('mouseenter', () => {
                            suggestionItem.style.backgroundColor = '#f0f0f0';
                        });
                        suggestionItem.addEventListener('mouseleave', () => {
                            suggestionItem.style.backgroundColor = 'white';
                        });

                        suggestionItem.addEventListener('click', () => {
                            selectSuggestion(feature);
                        });
                        suggestionsDiv.appendChild(suggestionItem);
                    });
                } else {
                    suggestionsDiv.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching geocode suggestions:', error);
            });
    } else {
        suggestionsDiv.style.display = 'none';
    }
});

// Function to handle selecting a suggestion
function selectSuggestion(feature) {
    addressInput.value = feature.place_name; 
    suggestionsDiv.style.display = 'none'; 
    const coordinates = feature.geometry.coordinates;

    map.flyTo({
        center: coordinates,
        zoom: 16
    });
    // Clear input
    addressInput.value = '';

    // Marker
    new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
}