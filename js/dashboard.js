// Dashboard Functions

// Update dashboard statistics and recent enrollments
function updateDashboard() {
    const enrollments = window.appState.enrollments;
    
    // Update statistics
    document.getElementById('totalStudents').textContent = enrollments.length;
    document.getElementById('activeEnrollments').textContent = 
        enrollments.filter(e => e.status === 'Enrolled').length;
    document.getElementById('pendingReviews').textContent = 
        enrollments.filter(e => e.status === 'Pending').length;

    // Update recent enrollments table
    renderRecentEnrollments();
}

// Render recent enrollments table
function renderRecentEnrollments() {
    const tableBody = document.getElementById('recentEnrollmentsTable');
    const enrollments = window.appState.enrollments;
    
    if (enrollments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No enrollments yet</td></tr>';
        return;
    }

    // Show last 5 enrollments
    const recentEnrollments = enrollments.slice(-5).reverse();
    
    tableBody.innerHTML = recentEnrollments.map(enrollment => `
        <tr>
            <td>${enrollment.studentId}</td>
            <td>${enrollment.firstName} ${enrollment.lastName}</td>
            <td>${enrollment.course}</td>
            <td>${enrollment.enrollmentDate}</td>
            <td><span class="badge badge-${enrollment.status.toLowerCase()}">${enrollment.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-warning" onclick="viewEnrollment(${enrollment.id})">View</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteEnrollment(${enrollment.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}
