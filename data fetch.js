// Initialize map
map.on('load', function () {
    const today = new Date();
    const dateFilterStart = new Date();
    dateFilterStart.setMonth(today.getMonth() - 12);

    const dateFilterEnd = new Date();
    dateFilterEnd.setMonth(today.getMonth() + 120);

    // Update slider attributes
    slider.min = dateFilterStart.getTime();
    slider.max = dateFilterEnd.getTime();
    slider.value = today.getTime();
    dateInput.value = today.toISOString().slice(0, 10);


    // Global variables for each dataset
    window.originalTMPData = null; // For Traffic TMP Registry
    window.originalSubdivisionData = null; // For Subdivision Construction
    window.originalPSP = null; // PSP Road
    window.originalIPAssets = null; // For Infrastructure Planning/Assets
    window.originalRIGARUS = null; // For RIGARUS

    // Fetch and store the original data for filtering
    fetch('https://web.fulcrumapp.com/shares/7720c6835056cfa0.geojson')
        .then(response => response.json())
        .then(data => {
            window.originalTMPData = data; 
            addGeoJsonData('https://web.fulcrumapp.com/shares/7720c6835056cfa0.geojson', 'Traffic TMP Registry');  //Traffic TMP Registry
        });

    fetch('https://web.fulcrumapp.com/shares/bf60f595b238b79a.geojson')
        .then(response => response.json())
        .then(data => {
            window.originalSubdivisionData = data; 
            addGeoJsonData('https://web.fulcrumapp.com/shares/bf60f595b238b79a.geojson', 'Subdivision Construction');   //Subdivision Construction
        });

    fetch('https://web.fulcrumapp.com/shares/bb8aae5257d194f5.geojson')
        .then(response => response.json())
        .then(data => {
            window.originalPSP = data; 
            addGeoJsonData('https://web.fulcrumapp.com/shares/bb8aae5257d194f5.geojson', 'PSP Road Cross Sections');   //PSP Road Cross Sections
        });

    fetch('https://web.fulcrumapp.com/shares/0107845e48091efd.geojson')
         .then(response => response.json())
         .then(data => {
             window.originalIPAssets = data; 
             addGeoJsonData('https://web.fulcrumapp.com/shares/0107845e48091efd.geojson', 'Infrastructure Planning/Assets');  //Infrastructure Planning/Assets
        });

    fetch('https://web.fulcrumapp.com/shares/0f0da1c8702f0aa6.geojson')
         .then(response => response.json())
         .then(data => {
             window.originalRIGARUS = data; 
             addGeoJsonData('https://web.fulcrumapp.com/shares/0f0da1c8702f0aa6.geojson', 'RIGARUS');  //RIGARUS
        });

    fetch('https://web.fulcrumapp.com/shares/f8f72f8fabb615a8.geojson')
         .then(response => response.json())
         .then(data => {
             window.originalCapital = data; 
             addGeoJsonData('https://web.fulcrumapp.com/shares/f8f72f8fabb615a8.geojson', 'Capital Projects (Operations)');  //Civil Capital Projects (Operations)
        });

    fetch('https://web.fulcrumapp.com/shares/080a3efde94fa172.geojson')
         .then(response => response.json())
         .then(data => {
             window.originalMCW = data; 
             addGeoJsonData('https://web.fulcrumapp.com/shares/080a3efde94fa172.geojson', 'MCW (Operations)');  //MCW (Operations)
        });


    const icons = {
        'road-closed': 'https://raw.githubusercontent.com/MeltonEngServ/Traffic-Management-Plans-Registry/refs/heads/main/assets/road-closed-icon.png',
        'lane-closure': 'https://raw.githubusercontent.com/MeltonEngServ/Traffic-Management-Plans-Registry/refs/heads/main/assets/lane-closure-icon.png',
        'truck-site-access': 'https://raw.githubusercontent.com/MeltonEngServ/Traffic-Management-Plans-Registry/refs/heads/main/assets/truck-site-access-icon.png'
    };

    // Load each icon image
    Object.keys(icons).forEach(key => {
        map.loadImage(icons[key], (error, image) => {
            if (error) {
                console.error(`Error loading ${key}:`, error);
                return;
            }
            map.addImage(key, image);
        });
    });

});