// Main Application Entry Point

// Global application state
window.appState = {
    enrollments: [],
    currentId: 1
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage
    const savedData = loadFromLocalStorage();
    window.appState.enrollments = savedData.enrollments;
    window.appState.currentId = savedData.currentId;
    
    // Setup event listeners
    setupEventListeners();
    
    // Update dashboard
    updateDashboard();
});

// Setup all event listeners
function setupEventListeners() {
    // Enrollment form submission
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', handleEnrollmentSubmit);
    }

    // Student search
    const searchStudent = document.getElementById('searchStudent');
    if (searchStudent) {
        searchStudent.addEventListener('input', handleSearch);
    }

    // Course search
    const searchCourse = document.getElementById('searchCourse');
    if (searchCourse) {
        searchCourse.addEventListener('input', filterCourses);
    }
}
