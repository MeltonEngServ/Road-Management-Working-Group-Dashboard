function setupTooltip(map) {
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // Wait for the map style to load
    map.on('styledata', () => {
        const sources = map.getStyle().sources;

        // Loop through each source and set up tooltips for their layers
        Object.keys(sources).forEach(sourceId => {
            const source = sources[sourceId];

            // Define the layers to interact with for each source
            const layers = [
                `${sourceId}-points-layer`,
                `${sourceId}-lines-layer`,
                `${sourceId}-polygons-layer`,
                `${sourceId}-icon-layer`
            ];

            // Function to format date
            function formatDate(value) {
                return value ? new Date(value).toLocaleDateString() : 'N/A';
            }

            // Show tooltip on hover for each layer
            layers.forEach(layer => {
                map.on('mouseenter', layer, (e) => {
                    map.getCanvas().style.cursor = 'pointer';

                    const coordinates = [e.lngLat.lng, e.lngLat.lat];
                    const properties = e.features[0].properties;

                    // Create tooltip field array
                    const fields = [
                        { label: 'Road Name', value: properties.road },
                        { label: 'Title', value: properties.precinct_structure_plan },
                        { label: 'Estate Name', value: properties.estate_name },
                        { label: 'Estate Name', value: properties.estate_name_other },
                        { label: 'Stage', value: properties.stage_id },
                        { label: 'Project Name', value: properties.project_name },
                        { label: 'Status', value: properties.status },
                        { label: 'Road Category', value: properties.road_category },
                        { label: 'Category', value: properties.category },
                        { label: 'Condition', value: properties.condition },
                        { label: 'Project', value: properties.project },
                        { label: 'Project or Program Start Year', value: properties.project_or_program_start_year },
                        { label: 'Project Progress', value: properties.project_progress },
                        { label: 'Project Updates', value: properties.updates },

                        // Civil Operations fields
                        { label: 'Program', value: properties.program },
                        { label: 'Type of Work', value: properties.type_of_work },
                        { label: 'Civil Operations Staff', value: properties.name_of_civil_operations_staff_assigned_to_deliver_the_proje },
                        { label: 'Contractor undertaking Works', value: properties.name_of_contractor_undertaking_works },
                        { label: 'Date when construction started', value: properties.date_when_construction_started },
                        { label: 'Date when construction was completed', value: properties.date_when_construction_was_completed },
                        { label: 'Total Cost', value: formatCurrency(properties.total_cost) }
                    ];

                    let tooltipContent = '';

                    // Add non-empty fields to the tooltip content, exclude 'N/A' values
                    fields.forEach(field => {
                        if (field.value && field.value !== 'N/A') {
                            tooltipContent += `<strong>${field.label}:</strong> ${field.value}<br>`;
                        }
                    });

                    // Check and add Road Work Start Date for TMP only
                    const startDate = formatDate(properties.road_work_start_date);
                    if (startDate && startDate !== 'N/A') {
                        tooltipContent += `<strong>Road Work Start Date:</strong> ${startDate}<br>`;

                        const endDate = formatDate(properties.road_work_end_date);
                        if (endDate && endDate !== 'N/A') {
                            tooltipContent += `<strong>Road Work End Date:</strong> ${endDate}<br>`;
                        }
                    }

                    // If no valid fields are found, provide a default message
                    if (!tooltipContent) {
                        tooltipContent = '<strong>No data available</strong>';
                    }

                    // Display the tooltip at the cursor position
                    popup.setLngLat(e.lngLat)
                        .setHTML(tooltipContent)
                        .addTo(map);

                    // Update tooltip position on mousemove
                    map.on('mousemove', layer, (e) => {
                        popup.setLngLat(e.lngLat);
                    });
                });

                // Hide tooltip on mouse leave
                map.on('mouseleave', layer, () => {
                    map.getCanvas().style.cursor = '';
                    popup.remove();

                    // Remove the mousemove event listener
                    map.off('mousemove', layer);
                });
            });
        });
    });
}

// Call the function to set up the tooltip
setupTooltip(map);
