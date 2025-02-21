// Function to apply filters once sources initialised
function applyFiltersWhenSourcesReady() {
    const sourcesToCheck = [
        { sourceId: 'Subdivision Construction', filterFunction: filterDataCHP },
        { sourceId: 'Traffic TMP Registry', filterFunction: filterDataTMP },
        { sourceId: 'PSP Road Cross Sections', filterFunction: filterDataPSP },
        { sourceId: 'RIGARUS', filterFunction: filterDataRIGARUS },
        { sourceId: 'MCW (Operations)', filterFunction: filterDataCivilOps },
        { sourceId: 'Capital Projects (Operations)', filterFunction: filterDataCivilOps },
        { sourceId: 'Infrastructure Planning/Assets', filterFunction: filterDataIPAssets }
    ];


    let allSourcesReady = true;

    sourcesToCheck.forEach(source => {
        if (map.getSource(source.sourceId)) {
            // If source is ready, apply its filter
            source.filterFunction();
        } else {
            // If any source isn't ready, set the flag to retry
            allSourcesReady = false;
        }
    });

    // Retry if not all sources are ready
    if (!allSourcesReady) {
        setTimeout(applyFiltersWhenSourcesReady, 100); // Retry every 100ms until all sources are loaded
    }
}

applyFiltersWhenSourcesReady();