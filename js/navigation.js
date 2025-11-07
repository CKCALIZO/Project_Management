// Navigation Functions
// These functions are kept for backward compatibility with old single-page version
// For multi-page version, navigation is handled via HTML links

function showDashboard() {
    window.location.href = 'index.html';
}

function showEnrollmentForm() {
    window.location.href = 'enrollment.html';
}

function showStudentList() {
    window.location.href = 'students.html';
}

function showCourseList() {
    window.location.href = 'courses.html';
}

function showStatistics() {
    window.location.href = 'reports.html';
}

function hideAllSections() {
    // Not needed in multi-page version
    // Kept for compatibility
}

// Set active navigation link (not needed in multi-page, handled by active class in HTML)
function setActiveNavLink(clickedLink) {
    // Not needed in multi-page version
    // Each page has its own active nav link set in HTML
}
