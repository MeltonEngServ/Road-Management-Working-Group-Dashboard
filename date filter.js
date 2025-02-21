// Event listener for date input (manual input)
dateInput.addEventListener('change', function() {
    const selectedDate = this.value;
    slider.value = new Date(selectedDate).getTime(); 
    filterDataTMP();
    filterDataCHP();
    filterDataIPAssets();
    filterDataCivilOps(selectedDate);
});
    
// Event listener for slider input (date slider)
slider.addEventListener('input', function() {
    const selectedDate = new Date(parseInt(this.value));
    dateInput.value = selectedDate.toISOString().slice(0, 10); 
    filterDataTMP();
    filterDataCHP();
    filterDataIPAssets();
    filterDataCivilOps(selectedDate);
});