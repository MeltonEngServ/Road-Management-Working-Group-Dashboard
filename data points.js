function addGeoJsonData(geojsonUrl, sourceId) {
    fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {
            map.addSource(sourceId, {
                type: 'geojson',
                data: data
            });

        // Polygon layer
        map.addLayer({
            'id': `${sourceId}-polygons-layer`,
            'type': 'fill',
            'source': sourceId,
            'filter': ['==', '$type', 'Polygon'],
            'paint': {
                'fill-color': [
                    'case',
                    //Traffic
                    ['==', ['get', 'status'], 'Road Closed'], '#db0000',
                    ['==', ['get', 'status'], ' Lane Closure'], '#ff8819',
                    ['==', ['get', 'status'], 'Temporary Traffic Signals'], '#294184',
                    ['==', ['get', 'status'], 'Truck Site Access'], '#1891c9',
                    ['==', ['get', 'status'], 'No Traffic Impacts'], '#87d30f',
                    ['==', ['get', 'status'], 'Not Defined'], '#cf04b4',
                    //Subdivisions
                    ['==', ['get', 'status'], 'Upcoming'], '#f711ff',
                    ['==', ['get', 'status'], 'In construction'], '#ff9011',
                    ['==', ['get', 'status'], 'Landscape In Construction'], '#ff9011',
                    ['==', ['get', 'status'], 'Bulk earth & sewer'], '#a37002',
                    //PSP Road Cross Sections
                    ['==', ['get', 'status'], 'Local'], '#76bf00',
                    ['==', ['get', 'status'], 'Connector'], '#ffe46b',
                    ['==', ['get', 'status'], 'Secondary Arterial'], '#ff983e',
                    ['==', ['get', 'status'], 'Primary Arterial'], '#ed4e4e',
                    //Infrastructure Planning/Assets
                    ['==', ['get', 'status'], 'Land'], '#00bf86',
                    ['==', ['get', 'status'], 'Transport'], '#dd9000',
                    //RIGARUS
                    ['==', ['get', 'status'], 'RIGARUS'], '#ff50f0',
                    //Operations
                    ['==', ['get', 'status'], 'Design Phase'], '#294184',
                    ['==', ['get', 'status'], 'Procurement Phase'], '#1891c9',
                    ['==', ['get', 'status'], 'Contract Awarded'], '#ffd300',
                    ['==', ['get', 'status'], 'Construction Phase'], '#ff8819',
                    ['==', ['get', 'status'], 'Completed'], '#87d30f',
                    ['==', ['get', 'status'], 'On-hold'], '#cb0d0c',
                    '#888888'
                ],
                'fill-opacity': 0.5
            }
        });

        // Line layer
        map.addLayer({
            'id': `${sourceId}-lines-layer`,
            'type': 'line',
            'source': sourceId,
            'filter': ['==', '$type', 'LineString'],
            'paint': {
                'line-width': 3,
                'line-color': [
                    'case',
                    //Traffic
                    ['==', ['get', 'status'], 'Road Closed'], '#db0000',
                    ['==', ['get', 'status'], ' Lane Closure'], '#ff8819',
                    ['==', ['get', 'status'], 'Temporary Traffic Signals'], '#294184',
                    ['==', ['get', 'status'], 'Truck Site Access'], '#1891c9',
                    ['==', ['get', 'status'], 'No Traffic Impacts'], '#87d30f',
                    ['==', ['get', 'status'], 'Not Defined'], '#cf04b4',
                    //Subdivisions
                    ['==', ['get', 'status'], 'Upcoming'], '#f711ff',
                    ['==', ['get', 'status'], 'In construction'], '#ff9011',
                    ['==', ['get', 'status'], 'Landscape In Construction'], '#ff9011',
                    ['==', ['get', 'status'], 'Bulk earth & sewer'], '#a37002',
                    //PSP Road Cross Sections
                    ['==', ['get', 'status'], 'Local'], '#76bf00',
                    ['==', ['get', 'status'], 'Connector'], '#ffe46b',
                    ['==', ['get', 'status'], 'Secondary Arterial'], '#ff983e',
                    ['==', ['get', 'status'], 'Primary Arterial'], '#ed4e4e',
                    //Infrastructure Planning/Assets
                    ['==', ['get', 'status'], 'Land'], '#00bf86',
                    ['==', ['get', 'status'], 'Transport'], '#dd9000',
                    //RIGARUS
                    ['==', ['get', 'status'], 'RIGARUS'], '#ff50f0',
                    //Operations
                    ['==', ['get', 'status'], 'Design Phase'], '#294184',
                    ['==', ['get', 'status'], 'Procurement Phase'], '#1891c9',
                    ['==', ['get', 'status'], 'Contract Awarded'], '#ffd300',
                    ['==', ['get', 'status'], 'Construction Phase'], '#ff8819',
                    ['==', ['get', 'status'], 'Completed'], '#87d30f',
                    ['==', ['get', 'status'], 'On-hold'], '#cb0d0c',
                    '#888888'
                ]
            }
        });

        // Icon layer
        map.addLayer({
            'id': `${sourceId}-icon-layer`,
            'type': 'symbol',
            'source': sourceId,
            'filter': [
                'any',
                ['==', ['get', 'status'], 'Road Closed'],
                ['==', ['get', 'status'], ' Lane Closure'],
                ['==', ['get', 'status'], 'Truck Site Access']
            ],
            'layout': {
                'icon-image': [
                    'case',
                    ['==', ['get', 'status'], 'Road Closed'], 'road-closed',
                    ['==', ['get', 'status'], ' Lane Closure'], 'lane-closure',
                    ['==', ['get', 'status'], 'Truck Site Access'], 'truck-site-access',
                    'default-icon' // Optional default if no match found
                ],
                'icon-size': 0.7,
                'icon-allow-overlap': true
            }
        });

        // Points layer
        map.addLayer({
            'id': `${sourceId}-points-layer`,
            'type': 'circle',
            'source': sourceId,
            'filter': ['==', '$type', 'Point'],
            'paint': {
                'circle-radius': 5,
                'circle-color': [
                    'case',
                    //Traffic
                    ['==', ['get', 'status'], 'Temporary Traffic Signals'], '#294184',
                    ['==', ['get', 'status'], 'No Traffic Impacts'], '#87d30f',
                    ['==', ['get', 'status'], 'Not Defined'], '#cf04b4',
                    //Subdivisions
                    ['==', ['get', 'status'], 'Upcoming'], '#f711ff',
                    ['==', ['get', 'status'], 'In construction'], '#ff9011',
                    ['==', ['get', 'status'], 'Landscape In Construction'], '#ff9011',
                    ['==', ['get', 'status'], 'Bulk earth & sewer'], '#a37002',
                    //PSP Road Cross Sections
                    ['==', ['get', 'status'], 'Local'], '#76bf00',
                    ['==', ['get', 'status'], 'Connector'], '#ffe46b',
                    ['==', ['get', 'status'], 'Secondary Arterial'], '#ff983e',
                    ['==', ['get', 'status'], 'Primary Arterial'], '#ed4e4e',
                    //Infrastructure Planning/Assets
                    ['==', ['get', 'status'], 'Land'], '#00bf86',
                    ['==', ['get', 'status'], 'Transport'], '#dd9000',
                    //RIGARUS
                    ['==', ['get', 'status'], 'RIGARUS'], '#ff50f0',
                    //Operations
                    ['==', ['get', 'status'], 'Design Phase'], '#294184',
                    ['==', ['get', 'status'], 'Procurement Phase'], '#1891c9',
                    ['==', ['get', 'status'], 'Contract Awarded'], '#ffd300',
                    ['==', ['get', 'status'], 'Construction Phase'], '#ff8819',
                    ['==', ['get', 'status'], 'Completed'], '#87d30f',
                    ['==', ['get', 'status'], 'On-hold'], '#cb0d0c',
                    '#888888'
                ],
                // Control opacity based on icon availability
                'circle-opacity': [
                    'case',
                    ['==', ['get', 'status'], 'Road Closed'], 0, 
                    ['==', ['get', 'status'], ' Lane Closure'], 0, 
                    ['==', ['get', 'status'], 'Truck Site Access'], 0, 
                    1
                ]
            }
        });
        });
}
