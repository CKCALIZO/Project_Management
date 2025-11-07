// Local Storage Management

// Save enrollments to localStorage
function saveToLocalStorage(enrollments, currentId) {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    localStorage.setItem('currentId', currentId.toString());
}

// Load enrollments from localStorage
function loadFromLocalStorage() {
    const savedEnrollments = localStorage.getItem('enrollments');
    const savedId = localStorage.getItem('currentId');
    
    return {
        enrollments: savedEnrollments ? JSON.parse(savedEnrollments) : [],
        currentId: savedId ? parseInt(savedId) : 1
    };
}

// Clear all data from localStorage
function clearLocalStorage() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        localStorage.removeItem('enrollments');
        localStorage.removeItem('currentId');
        return true;
    }
    return false;
}
