// Function to parse the date string (YYYY-MM-DD) into a JavaScript Date object
function parseDateString(dateString) {
    if (!dateString) return null;

    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
}

// Function to format text string into currency
function formatCurrency(amount) {

    if (typeof amount === 'string') {
        amount = amount.replace(/[^0-9.-]+/g, '').trim();  
    }

    if (amount === null || amount === undefined || amount === '') {
        return 'N/A';
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
        return 'N/A';
    }

    const formattedAmount = new Intl.NumberFormat('en-US').format(numericAmount);
    return `$${formattedAmount}`;
}

// Function to formate date for user readability (eg 20th Oct, 2024)
function formatDate(dateString) {
    const date = new Date(dateString);
    
    if (isNaN(date)) return 'N/A';

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }).substring(0, 3);
    const year = date.getFullYear();

    const suffix = (day) => {
        const j = day % 10, k = day % 100;
        if (j === 1 && k !== 11) return day + "st";
        if (j === 2 && k !== 12) return day + "nd";
        if (j === 3 && k !== 13) return day + "rd";
        return day + "th";
    };

    return `${suffix(day)} ${month}, ${year}`;
}