function setupModal(map) {
    // Create a popup for modal display (this can be reused for displaying modal content)
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // Wait for the map style to load
    map.on('styledata', () => {
        const sources = map.getStyle().sources;

        // Loop through each source and set up modals for their layers
        Object.keys(sources).forEach(sourceId => {
            const source = sources[sourceId];

            // Define the layers to interact with for each source
            const layers = [
                `${sourceId}-points-layer`,
                `${sourceId}-lines-layer`,
                `${sourceId}-polygons-layer`,
                `${sourceId}-icon-layer`
            ];

            // Function to format currency
            function formatCurrency(value) {
                if (isNaN(value) || value === null || value === undefined) {
                    return 'N/A';
                }
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
            }

            // Function to format date
            function formatDate(value) {
                return value ? new Date(value).toLocaleDateString() : 'N/A';
            }

            // Set up click event to trigger modal for each layer
            layers.forEach(layer => {
                map.on('click', layer, (e) => {
                    const properties = e.features[0].properties;

                    console.log(properties);

                    // Create modal content based on property fields
                    let modalContent = `<h3>${
                        // Prioritize important fields for title
                        properties.road || 
                        properties.estate_name || 
                        properties.project_name ||
                        'N/A'
                    }</h3>`;

                    // Define fields to display in modal
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
                        { label: 'Date of Design Plan Transferred from Engineering to Civil Ops', value: properties.date_of_design_plan_transferred_from_engineering_to_civil_op },
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

                    // Construct modal content from fields
                    fields.forEach(field => {
                        if (field.value && field.value !== 'N/A') {
                            modalContent += `<p><strong>${field.label}:</strong> ${field.value}</p>`;
                        }
                    });

                    // If no valid fields are found, display a default message
                    if (!modalContent) {
                        modalContent = '<p><strong>No data available</strong></p>';
                    }

                    // Set the modal body content and display the modal
                    document.getElementById('modal-body').innerHTML = modalContent;
                    document.getElementById('modal').style.display = 'block';
                });
            });
        });
    });

    // Close modal when the user clicks the close button (X)
    document.querySelector('.close-button').onclick = function() {
        document.getElementById('modal').style.display = 'none';
    };

    // Close the modal when the user clicks outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Call setupModal function to initialize it
setupModal(map);
