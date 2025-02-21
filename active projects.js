// Event listener for active projects checkbox
document.getElementById('activeProjectsToggle').addEventListener('change', () => {
    // Reapply all filters when the toggle changes
    filterDataTMP();
    filterDataCHP();
    filterDataPSP();
    filterDataIPAssets();
    filterDataRIGARUS();
    filterDataCivilOps();
});