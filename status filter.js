const tooltip = document.getElementById('tooltip');
const dateInput = document.getElementById('dateInput');
const slider = document.getElementById('slider');
const visibilityStates = {};

document.querySelectorAll('.legend-key').forEach(item => {
    const layerId = item.getAttribute('data-layer');
    visibilityStates[layerId] = true; 
});

let visibleStatuses = []

// Function to filter traffic data
function filterDataTMP() {
    const geojsonData = window.originalTMPData;
    const selectedDate = new Date(dateInput.value);
    selectedDate.setHours(0, 0, 0, 0);

    const oneYearBeforeSelectedDate = new Date(selectedDate);
    oneYearBeforeSelectedDate.setFullYear(selectedDate.getFullYear() - 1);

    // Filter features based on visible statuses and date
    const filteredFeatures = geojsonData.features.filter(feature => {
        const startDateStr = feature.properties.road_work_start_date;
        const endDateStr = feature.properties.road_work_end_date;

        const roadWorkStart = parseDateString(startDateStr); 
        const roadWorkEnd = parseDateString(endDateStr);

        // Exclude records if no end date is provided and the start date is more than a year before the selected date
        if (roadWorkEnd === null && roadWorkStart < oneYearBeforeSelectedDate) {
            return false;
        }

        // Check if feature's dates fit within the selected date range
        const isDateValid = (roadWorkStart && roadWorkEnd)
            ? (selectedDate >= roadWorkStart && selectedDate <= roadWorkEnd)
            : (roadWorkStart ? selectedDate >= roadWorkStart : roadWorkEnd && selectedDate <= roadWorkEnd);

        // Status visibility check
        const isStatusVisible = visibleStatuses.length === 0 || 
                                (feature.properties.status && visibleStatuses.includes(feature.properties.status.trim()));

        // Return true if visible
        return isDateValid && isStatusVisible;
    });

    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: filteredFeatures
    };

    map.getSource('Traffic TMP Registry').setData(filteredGeoJson);
}


// Function to filter Subdivision Construction data
function filterDataCHP() {
    const geojsonData = window.originalSubdivisionData;
    const selectedDate = new Date(dateInput.value);
    selectedDate.setHours(0, 0, 0, 0);

    // Define the allowed statuses
    const allowedStatuses = [
        'Upcoming',
        'In construction',
        'Landscape In Construction',
        'Bulk earth & sewer'
    ];

    const filteredFeatures = geojsonData.features.filter(feature => {
        const edlpCommencementDateStr = feature.properties.edlp_commencement_date;
        const status = feature.properties.status;
        

        const edlpCommencementDate = parseDateString(edlpCommencementDateStr);

        // Check if EDLP commencement date has passed
        const hasDatePassed = edlpCommencementDate && edlpCommencementDate < selectedDate;

        // Determine if the feature's status is in allowedStatuses and in visibleStatuses
        const isAllowedStatus = allowedStatuses.includes(status);
        const isVisibleStatus = visibleStatuses.length === 0 || visibleStatuses.includes(status);

        // Show features with selected or allowed statuses where the date has not passed (or date is null)
        return isAllowedStatus && isVisibleStatus && (!hasDatePassed || edlpCommencementDate === null);
    });

    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: filteredFeatures
    };

    map.getSource('Subdivision Construction').setData(filteredGeoJson);
}

// Function to filter PSP road data
function filterDataPSP() {
    const geojsonData = window.originalPSP;

    // Define the allowed statuses
    const allowedStatuses = [
        'Local',
        'Connector',
        'Primary Arterial',
        'Secondary Arterial'
    ];

    const toggleActiveOnly = document.getElementById('activeProjectsToggle').checked;

    const filteredFeatures = geojsonData.features.filter(feature => {
        const roadStatus = feature.properties._road_status ? feature.properties._road_status.trim() : '';
        const status = feature.properties.status ? feature.properties.status.trim() : '';

        // Check if the feature's _road_status includes the word "Proposed"
        const isProposed = roadStatus.includes("Proposed");

        // Determine if the feature's status is in allowedStatuses and in visibleStatuses
        const isAllowedStatus = allowedStatuses.includes(status);
        const isVisibleStatus = visibleStatuses.length === 0 || visibleStatuses.includes(status);

        // Corrected active check: if the checkbox is toggled, hide everything
        const isActive = toggleActiveOnly ? false : true; // Hides everything if checkbox is checked

        // Return only records that are visible and active (if toggle is off)
        return isActive && isAllowedStatus && isVisibleStatus;
    });

    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: filteredFeatures
    };

    map.getSource('PSP Road Cross Sections').setData(filteredGeoJson);
}


// Function to filter Infrastructure Planning/Assets data
function filterDataIPAssets() {
    const geojsonData = window.originalIPAssets;
    const selectedDate = new Date(dateInput.value);
    selectedDate.setHours(0, 0, 0, 0);

    const toggleActiveOnly = document.getElementById('activeProjectsToggle').checked;

    const filteredFeatures = geojsonData.features.filter(feature => {
        const status = feature.properties.status;
        const projectStartStr = feature.properties.project_or_program_start_year
            ? feature.properties.project_or_program_start_year.trim()
            : null;

        let projectStartDate = null;

        // Parse the start date
        if (projectStartStr && projectStartStr.match(/^\d{2}\/\d{2}$/)) {
            const yearSuffix = projectStartStr.split('/')[0];
            const year = `20${yearSuffix}`;
            projectStartDate = new Date(`July 1, ${year}`);
        } else if (projectStartStr && projectStartStr.includes('1st July')) {
            const year = parseInt(projectStartStr.split(' ')[2], 10);
            projectStartDate = new Date(`July 1, ${year}`);
        }

        // Skip features with no valid start date
        if (!projectStartDate) {
            return false;
        }

        // Check if the project is committed and if it should be hidden when active projects are toggled
        const isCommitted = feature.properties.committed;
        const isActive = toggleActiveOnly
            ? projectStartDate <= selectedDate && isCommitted !== "FALSE" // Hide if committed is "FALSE" when active only is toggled
            : true;

        // Check if status is allowed and visible
        const isAllowedStatus = ['Land', 'Transport'].includes(status);
        const isVisibleStatus = visibleStatuses.length === 0 || visibleStatuses.includes(status);

        // Include only if all conditions are met
        const includeFeature = isActive && isAllowedStatus && isVisibleStatus;
        return includeFeature;
    });

    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: filteredFeatures
    };

    if (map.getSource('Infrastructure Planning/Assets')) {
        map.getSource('Infrastructure Planning/Assets').setData(filteredGeoJson);
    } else {
        console.error("Source 'Infrastructure Planning/Assets' not found");
    }
}


// Need to add filter for RIGARUS but data needs to be cleaned, ask Michael to set a date instead of "31/32 and future" or "34/35?"
// Function to filter RIGARUS data
function filterDataRIGARUS() {
    const geojsonData = window.originalRIGARUS;

    // Define the allowed statuses
    const allowedStatuses = [
        'RIGARUS'
    ];

    const filteredFeatures = geojsonData.features.filter(feature => {
    const status = feature.properties.status ? feature.properties.status.trim() : ''; // Ensure trimming
    const toggleActiveOnly = document.getElementById('activeProjectsToggle').checked;

        // Check if the feature's status is in allowedStatuses and visibleStatuses
        const isAllowedStatus = allowedStatuses.includes(status);
        const isVisibleStatus = visibleStatuses.length === 0 || visibleStatuses.includes(status);

        // Corrected active check: if the checkbox is toggled, hide everything
        const isActive = toggleActiveOnly ? false : true; // Hides everything if checkbox is checked

        // Return features only if they match the allowed and visible statuses
        return isActive && isAllowedStatus && isVisibleStatus;
    });

    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: filteredFeatures
    };

    map.getSource('RIGARUS').setData(filteredGeoJson);
}

function filterDataCivilOps(selectedDate) {
    const mcwData = window.originalMCW;
    const capitalData = window.originalCapital;

    // Define the allowed statuses
    const allowedStatuses = [
        'Design Phase',
        'Procurement Phase',
        'Contract Awarded',
        'Construction Phase',
        'Completed',
        'On-hold'
    ];

    // Check if the selected date is in the past or future
    const currentDate = new Date();
    const isFutureDate = new Date(selectedDate) > currentDate;

    // Function to filter features based on status, date, and active checkbox
    const filterFeatures = (geojsonData) => {
        // Check if geojsonData is valid and contains features
        if (!geojsonData || !geojsonData.features) {
            console.error("GeoJSON data or features are missing");
            return []; // Return an empty array if the data is invalid
        }

        const toggleActiveOnly = document.getElementById('activeProjectsToggle').checked;

        return geojsonData.features.filter(feature => {
            const status = feature.properties.status ? feature.properties.status.trim() : '';
            const isAllowedStatus = allowedStatuses.includes(status);
            const isVisibleStatus = visibleStatuses.length === 0 || visibleStatuses.includes(status);

            // If active projects toggle is on, exclude Completed, On-hold, and Design Phase
            const isActive = toggleActiveOnly
            ? !['Completed', 'On-hold', 'Design Phase'].includes(status)  // Exclude these statuses
            : true;

            // Get project date
            const projectDate = feature.properties.date_rfq_was_advertised;
            const isProjectInFuture = projectDate ? new Date(projectDate) > selectedDate : false;

            // If the project date is in the future, hide the project
            if (isProjectInFuture) {
                return false; // Hide the project
            }

            // If it's a future date, hide all projects
            if (isFutureDate) {
                return false;  // Hide all projects
            }

            // Return features only if they match the allowed, visible, active, and date status
            return isAllowedStatus && isVisibleStatus && isActive;
        });
    };

    // Filter features for both datasets
    const filteredMCWFeatures = filterFeatures(mcwData);
    const filteredCapitalFeatures = filterFeatures(capitalData);

    // Combine the filtered features into one GeoJSON object
    const combinedFilteredGeoJson = {
        type: 'FeatureCollection',
        features: [...filteredMCWFeatures, ...filteredCapitalFeatures]
    };

    // Update the map sources with the filtered data for both datasets
    map.getSource('MCW (Operations)')?.setData({
        type: 'FeatureCollection',
        features: filteredMCWFeatures
    });

    map.getSource('Capital Projects (Operations)')?.setData({
        type: 'FeatureCollection',
        features: filteredCapitalFeatures
    });
}

// Toggle visibility of legend categories when the category title is clicked
document.querySelectorAll('.category-title').forEach(title => {
    title.addEventListener('click', () => {
        const parentCategory = title.parentElement;
        parentCategory.classList.toggle('open');
    });
});

// Event listener to legend items
document.querySelectorAll('.legend-key').forEach(item => {
    item.addEventListener('click', () => {
        const layerId = item.getAttribute('data-layer');

        // Toggle the status in visibleStatuses
        if (visibleStatuses.includes(layerId)) {
            // If already in visibleStatuses, remove it
            visibleStatuses = visibleStatuses.filter(status => status !== layerId);
        } else {
            // Else add it
            visibleStatuses.push(layerId);
        }

        // Check if no filters are selected
        if (visibleStatuses.length === 0) {
            // Set all legend items to full opacity
            document.querySelectorAll('.legend-key').forEach(legendItem => {
                legendItem.style.opacity = '1';
            });
        } else {
            // Update opacity of all legend items based on selection
            document.querySelectorAll('.legend-key').forEach(legendItem => {
                const legendLayerId = legendItem.getAttribute('data-layer');
                legendItem.style.opacity = visibleStatuses.includes(legendLayerId) ? '1' : '0.5';
            });
        }

        // Apply the filters
        filterDataTMP();
        filterDataCHP();
        filterDataPSP();
        filterDataIPAssets();
        filterDataRIGARUS();
        filterDataCivilOps();
    });
});