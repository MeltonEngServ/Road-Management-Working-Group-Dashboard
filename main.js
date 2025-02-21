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
                        // Traffic
                        ['==', ['get', 'status'], 'Road Closed'], '#db0000',
                        ['==', ['get', 'status'], ' Lane Closure'], '#ff8819',
                        ['==', ['get', 'status'], 'Temporary Traffic Signals'], '#294184',
                        ['==', ['get', 'status'], 'Truck Site Access'], '#1891c9',
                        ['==', ['get', 'status'], 'No Traffic Impacts'], '#87d30f',
                        ['==', ['get', 'status'], 'Not Defined'], '#cf04b4',
                        // Subdivisions
                        ['==', ['get', 'status'], 'Upcoming'], '#f711ff',
                        ['==', ['get', 'status'], 'In construction'], '#ff9011',
                        ['==', ['get', 'status'], 'Landscape In Construction'], '#ff9011',
                        ['==', ['get', 'status'], 'Bulk earth & sewer'], '#a37002',
                        // PSP Road Cross Sections
                        ['==', ['get', 'status'], 'Local'], '#76bf00',
                        ['==', ['get', 'status'], 'Connector'], '#ffe46b',
                        ['==', ['get', 'status'], 'Secondary Arterial'], '#ff983e',
                        ['==', ['get', 'status'], 'Primary Arterial'], '#ed4e4e',
                        // Infrastructure Planning/Assets
                        ['==', ['get', 'status'], 'Land'], '#00bf86',
                        ['==', ['get', 'status'], 'Transport'], '#dd9000',
                        // RIGARUS
                        ['==', ['get', 'status'], 'RIGARUS'], '#ff50f0',
                        // Operations
                        ['==', ['get', 'status'], 'Design Phase'], '#294184',
                        ['==', ['get', 'status'], 'Procurement Phase'], '#1891c9',
                        ['==', ['get', 'status'], 'Contract Awarded'], '#ffd300',
                        ['==', ['get', 'status'], 'Construction Phase'], '#ff8819',
                        ['==', ['get', 'status'], 'Completed'], '#87d30f',
                        ['==', ['get', 'status'], 'On-hold'], '#cb0d0c',
                        '#888888'
                    ],
                    'fill-opacity': 0.5
                },
                'before': `${sourceId}-lines-layer` // Ensure polygons are rendered before lines
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
                        // Traffic
                        ['==', ['get', 'status'], 'Road Closed'], '#db0000',
                        ['==', ['get', 'status'], ' Lane Closure'], '#ff8819',
                        ['==', ['get', 'status'], 'Temporary Traffic Signals'], '#294184',
                        ['==', ['get', 'status'], 'Truck Site Access'], '#1891c9',
                        ['==', ['get', 'status'], 'No Traffic Impacts'], '#87d30f',
                        ['==', ['get', 'status'], 'Not Defined'], '#cf04b4',
                        // Subdivisions
                        ['==', ['get', 'status'], 'Upcoming'], '#f711ff',
                        ['==', ['get', 'status'], 'In construction'], '#ff9011',
                        ['==', ['get', 'status'], 'Landscape In Construction'], '#ff9011',
                        ['==', ['get', 'status'], 'Bulk earth & sewer'], '#a37002',
                        // PSP Road Cross Sections
                        ['==', ['get', 'status'], 'Local'], '#76bf00',
                        ['==', ['get', 'status'], 'Connector'], '#ffe46b',
                        ['==', ['get', 'status'], 'Secondary Arterial'], '#ff983e',
                        ['==', ['get', 'status'], 'Primary Arterial'], '#ed4e4e',
                        // Infrastructure Planning/Assets
                        ['==', ['get', 'status'], 'Land'], '#00bf86',
                        ['==', ['get', 'status'], 'Transport'], '#dd9000',
                        // RIGARUS
                        ['==', ['get', 'status'], 'RIGARUS'], '#ff50f0',
                        // Operations
                        ['==', ['get', 'status'], 'Design Phase'], '#294184',
                        ['==', ['get', 'status'], 'Procurement Phase'], '#1891c9',
                        ['==', ['get', 'status'], 'Contract Awarded'], '#ffd300',
                        ['==', ['get', 'status'], 'Construction Phase'], '#ff8819',
                        ['==', ['get', 'status'], 'Completed'], '#87d30f',
                        ['==', ['get', 'status'], 'On-hold'], '#cb0d0c',
                        '#888888'
                    ]
                },
                'before': `${sourceId}-icon-layer` // Ensure lines are rendered before icons
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
                },
                'before': `${sourceId}-points-layer` // Ensure icons are rendered before points
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
                        // Traffic
                        ['==', ['get', 'status'], 'Temporary Traffic Signals'], '#294184',
                        ['==', ['get', 'status'], 'No Traffic Impacts'], '#87d30f',
                        ['==', ['get', 'status'], 'Not Defined'], '#cf04b4',
                        // Subdivisions
                        ['==', ['get', 'status'], 'Upcoming'], '#f711ff',
                        ['==', ['get', 'status'], 'In construction'], '#ff9011',
                        ['==', ['get', 'status'], 'Landscape In Construction'], '#ff9011',
                        ['==', ['get', 'status'], 'Bulk earth & sewer'], '#a37002',
                        // PSP Road Cross Sections
                        ['==', ['get', 'status'], 'Local'], '#76bf00',
                        ['==', ['get', 'status'], 'Connector'], '#ffe46b',
                        ['==', ['get', 'status'], 'Secondary Arterial'], '#ff983e',
                        ['==', ['get', 'status'], 'Primary Arterial'], '#ed4e4e',
                        // Infrastructure Planning/Assets
                        ['==', ['get', 'status'], 'Land'], '#00bf86',
                        ['==', ['get', 'status'], 'Transport'], '#dd9000',
                        // RIGARUS
                        ['==', ['get', 'status'], 'RIGARUS'], '#ff50f0',
                        // Operations
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



// Tooltip

// Create a popup
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
});

    // Dynamically add `aria-hidden` when popup is open
    popup.on('open', () => {
        const closeButton = document.querySelector('.mapboxgl-popup-close-button');
        if (closeButton) {
            closeButton.setAttribute('aria-hidden', 'true');
            closeButton.setAttribute('tabindex', '-1');
        }
    });

    // Dynamically remove `aria-hidden` when popup is closed
    popup.on('close', () => {
        const closeButton = document.querySelector('.mapboxgl-popup-close-button');
        if (closeButton) {
            closeButton.removeAttribute('aria-hidden');
            closeButton.removeAttribute('tabindex');
        }
    });

const layers = [`${sourceId}-points-layer`, `${sourceId}-lines-layer`, `${sourceId}-polygons-layer`, `${sourceId}-icon-layer`];
let currentFulcrumId = null;
let activeTooltip = null;

// Ensure highlight layer exists
const highlightLayerId = `${sourceId}-highlight-layer`;
if (!map.getLayer(highlightLayerId)) {
    map.addLayer({
        id: highlightLayerId,
        type: 'line',
        source: sourceId,
        paint: {
            'line-color': 'black',
            'line-width': 3
        },
        filter: ['==', 'fulcrum_id', '']
    });
}

layers.forEach(layer => {
    
    map.on('mousemove', layer, (e) => {
        map.getCanvas().style.cursor = 'pointer';

        // Query features and filter to get the topmost feature
        const features = map.queryRenderedFeatures(e.point, { layers: layers });
        if (features.length === 0) return;

        const topmostFeature = features[0];
        const properties = topmostFeature.properties;
        const coordinates = e.lngLat;
        const newFulcrumId = properties.fulcrum_id;

        // Only update tooltip and highlight if the feature changes
        if (currentFulcrumId !== newFulcrumId) {
            currentFulcrumId = newFulcrumId;
            map.setFilter(highlightLayerId, ['==', 'fulcrum_id', currentFulcrumId]);

            // Remove the previous tooltip if any
            if (activeTooltip) {
                activeTooltip.remove();
            }

            // Create tooltip content dynamically
            const fields = [
                { label: 'Road Name', value: properties.road },
                { label: 'Title', value: properties.precinct_structure_plan },
                { label: 'Estate Name', value: properties.estate_name },
                { label: 'Estate Name Other', value: properties.estate_name_other },
                { label: 'Stage', value: properties.stage_id },
                { label: 'Project Name', value: properties.project_name },
                { label: 'Status', value: properties.status },
                { label: 'Road Category', value: properties.road_category },
                { label: 'Category', value: properties.category },
                { label: 'Condition', value: properties.condition },
                { label: 'Project', value: properties.project },
                { label: 'Start Year', value: properties.project_or_program_start_year },
                { label: 'Progress', value: properties.project_progress },
                { label: 'Updates', value: properties.updates },
                { label: 'Program', value: properties.program },
                { label: 'Type of Work', value: properties.type_of_work },
                { label: 'Civil Ops Staff', value: properties.name_of_civil_operations_staff_assigned_to_deliver_the_proje },
                { label: 'Contractor', value: properties.name_of_contractor_undertaking_works },
                { label: 'Construction Start', value: formatDate(properties.date_when_construction_started) },
                { label: 'Construction End', value: formatDate(properties.date_when_construction_was_completed) },
                { label: 'Total Cost', value: formatCurrency(properties.total_cost) }
            ];

            let tooltipContent = '';
            fields.forEach(field => {
                if (field.value && field.value !== 'N/A') {
                    tooltipContent += `<strong>${field.label}:</strong> ${field.value}<br>`;
                }
            });

            if (!tooltipContent) {
                tooltipContent = '<strong>No data available</strong>';
            }

            // Create and store the new tooltip
            activeTooltip = new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(tooltipContent)
                .addTo(map);
        } else {
            activeTooltip.setLngLat(coordinates);
        }
    });

    map.on('mouseleave', layer, () => {
        map.getCanvas().style.cursor = '';
        if (activeTooltip) {
            activeTooltip.remove();
        }
        map.setFilter(highlightLayerId, ['==', 'fulcrum_id', '']);
        currentFulcrumId = null;
    });









    // Modal
    map.on('click', layer, (e) => {
        const properties = e.features[0].properties;
        
        //console.log(e);
        console.log(properties)

        let modalContent = `<h3>${
                                //Traffic and RIGARUS
                                properties.road || 
                                //Subdivision Construction
                                properties.estate_name || 
                                properties.estate_name_other || 
                                //PSP Roads
                                properties.precinct_structure_plan ||
                                //Infrastructure Planning/Assets and Civil Operations
                                properties.project_name ||
                                'N/A'}</h3>`;

        // Create modal pop-up field array
        const fields = [

            { label: 'Status', value: properties.status },

            //Traffic
            { label: 'From Road', value: properties.from_road },
            { label: 'To Road', value: properties.to_road },
            { label: 'Description of Works', value: properties.description_of_works },
            { label: 'Road Work Start Date', value: formatDate(properties.road_work_start_date) },
            { label: 'Road Work End Date', value: formatDate(properties.road_work_end_date) },
            { label: 'Traffic Impact', value: properties.traffic_impact },
            { label: 'Road Work Type', value: properties.road_work_type },
            { label: 'Expected Delay', value: properties.expected_delay },
            { label: 'Application Company', value: properties.application_company },
            { label: 'Applicant Contact', value: properties.applicant_contact_ },
            { label: 'Applicant Contact Number', value: properties.applicant_contact_number },
            { label: 'Application Type', value: properties.application_type },
            { label: 'Authorisation Officer', value: properties.authorisation_officer },
            { label: 'Council Project', value: properties.council_project },
            { label: 'Council Project Manager', value: properties.council_project_manager },
            { label: 'Project Manager Email', value: properties.project_manager_email },
            { label: 'Project Manager Phone Number', value: properties.project_manager_phone_number },
            { label: 'Site Supervisor', value: properties.site_supervisor },
            { label: 'Site Supervisor Contact', value: properties.site_supervisor_contact },
            { label: 'Site Visit Required', value: properties.site_visit_required },
            { label: 'VMS Required', value: properties.vms_required },
            { label: 'Origin of Project', value: properties.origin_of_project },

            //Subdivisions
            { label: 'Stage ID', value: properties.stage_id },
            { label: 'Consultant', value: properties.consultant },
            { label: 'Consultant', value: properties.consultant_other },
            { label: 'Developers', value: properties.developers },
            { label: 'Developers', value: properties.developers_other },
            { label: 'Planning Permit Reference', value: properties.planning_ppermit_reference },
            { label: 'Contractor', value: properties.contractor },
            { label: 'Contractor', value: properties.contractor_other },
            { label: 'MCC Supervisor', value: properties.mcc_supervisor },
            { label: 'Pre-commencement Date', value: formatDate(properties.date_pre_comm) },
            { label: 'Environmental Protection Date', value: formatDate(properties.date_emp) },
            { label: 'Bulk Earthworks Date', value: formatDate(properties.date_bulkearthworks) },
            { label: 'Foundation Bedding Date', value: formatDate(properties.date_foundation_beding) },
            { label: 'Drainage Date', value: formatDate(properties.date_drainage) },
            //ETC complete other relevant details as needed

            //PSP Roads
            { label: 'Precint Structure Plan', value: properties.precinct_structure_plan },
            { label: 'Road Category', value: properties.road_category },
            { label: 'Road Status', value: properties._road_status },
            { label: 'No of Lanes', value: properties.lanes },
            { label: 'Bus capable road', value: properties.bus_capable_road },

            //Infrastructure Planning/Assets
            { label: 'Public Name', value: properties.public_name },
            { label: 'Project or Program Start Year', value: properties.project_or_program_start_year },
            { label: 'Project Decription', value: properties.project_description },
            { label: 'Public Decription', value: properties.public_description },
            { label: 'Asset Expenditure Type', value: properties.asset_expenditure_type },
            { label: 'Project Delivery Agent', value: properties.project_delivery_agent },
            { label: 'Project Manager', value: properties.project_manager },
            { label: 'Capital Project Manager', value: properties.capital_project_manager },
            { label: 'Project Type', value: properties.project_type },
            { label: 'Updates', value: properties.updates },
            { label: 'Project Completed', value: properties.project_completed },
            { label: 'Project Progress', value: properties.project_progress },
            { label: 'Comments', value: properties.comments },
            //ETC complete other relevant details as needed

            //RIGARUS
            { label: 'Suburb', value: properties.suburb },
            { label: 'Category', value: properties.category },
            { label: 'Condition', value: properties.condition },
            { label: 'Length', value: properties.length },
            { label: 'Volume', value: properties.volume },
            { label: 'Project', value: properties.project },
            { label: 'Project No.', value: properties.project_no },
            { label: 'Financial Year', value: properties.fy },
            { label: 'Comments', value: properties.comments },

            //Civil Operations
            { label: 'Program', value: properties.program },
            { label: 'Type of Work', value: properties.type_of_work },
            { label: 'Asset ID', value: properties.asset_id_if_applicable },
            { label: 'Name of Engineering Designer', value: properties.name_of_engineering_designer },
            { label: 'Date of Design Plan Transferred from Engineering to Civil Ops', value: formatDate(properties.date_of_design_plan_transferred_from_engineering_to_civil_op) },
            { label: 'Cost Estimate', value: formatCurrency(properties.cost_estimate) },
            { label: 'Budget', value: formatCurrency(properties.budget) },
            { label: 'Civil Operations Staff', value: properties.name_of_civil_operations_staff_assigned_to_deliver_the_proje },
            { label: 'Allocated Financial Year', value: properties.what_financial_year_is_this_project_allocated_to },
            { label: 'Date RFQ was advertised', value: formatDate(properties.date_rfq_was_advertised) },
            { label: 'Date RFQ period closed', value: formatDate(properties.date_rfq_period_closed) },
            { label: 'Date RFA completed', value: formatDate(properties.date_rfa_completed) },
            { label: 'Date the Project was Awarded', value: formatDate(properties.date_the_project_was_awarded) },
            { label: 'Contractor undertaking Works', value: properties.name_of_contractor_undertaking_works },
            { label: 'Date when construction started', value: formatDate(properties.date_when_construction_started) },
            { label: 'Date when construction was completed', value: formatDate(properties.date_when_construction_was_completed) },
            { label: 'Project Cost', value: formatCurrency(properties.project_cost) },
            { label: 'Variations Cost', value: formatCurrency(properties.variations_cost) },
            { label: 'Total Cost', value: formatCurrency(properties.total_cost) }

        ];

        // Hide empty and N/A fields
        fields.forEach(field => {
            if (field.value && field.value !== 'N/A') {
                modalContent += `<p><strong>${field.label}:</strong> ${field.value}</p>`;
            }
        });

        // Set the modal body content
        document.getElementById('modal-body').innerHTML = modalContent;
        document.getElementById('modal').style.display = 'block';
    });
});

    // Close modal on x click
    document.querySelector('.close-button').onclick = function() {
        document.getElementById('modal').style.display = 'none';
    };

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

        });

}