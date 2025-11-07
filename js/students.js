// Student Management Functions

// Render student list
function renderStudentList(filteredEnrollments = null) {
    const tableBody = document.getElementById('studentListTable');
    const displayEnrollments = filteredEnrollments || window.appState.enrollments;
    
    // Update count
    document.getElementById('studentCount').textContent = displayEnrollments.length;
    
    if (displayEnrollments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" class="text-center text-muted">No students found</td></tr>';
        return;
    }

    tableBody.innerHTML = displayEnrollments.map(enrollment => `
        <tr>
            <td>${enrollment.studentId}</td>
            <td>${enrollment.firstName} ${enrollment.lastName}</td>
            <td>${enrollment.email}</td>
            <td>${enrollment.phoneNumber}</td>
            <td>${enrollment.course}</td>
            <td>${enrollment.academicYear}</td>
            <td>${enrollment.semester}</td>
            <td><span class="badge badge-${enrollment.status.toLowerCase()}">${enrollment.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-warning me-1" onclick="viewEnrollment(${enrollment.id})">View</button>
                <button class="btn btn-sm btn-outline-secondary me-1" onclick="editEnrollment(${enrollment.id})">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteEnrollment(${enrollment.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Search handler
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const enrollments = window.appState.enrollments;
    
    const filtered = enrollments.filter(enrollment => {
        return enrollment.firstName.toLowerCase().includes(searchTerm) ||
               enrollment.lastName.toLowerCase().includes(searchTerm) ||
               enrollment.studentId.toLowerCase().includes(searchTerm) ||
               enrollment.email.toLowerCase().includes(searchTerm) ||
               enrollment.course.toLowerCase().includes(searchTerm);
    });

    renderStudentList(filtered);
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase();
    const courseFilter = document.getElementById('filterCourse').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const sortBy = document.getElementById('sortBy').value;
    const enrollments = window.appState.enrollments;
    
    let filtered = enrollments.filter(enrollment => {
        const matchesSearch = enrollment.firstName.toLowerCase().includes(searchTerm) ||
                            enrollment.lastName.toLowerCase().includes(searchTerm) ||
                            enrollment.studentId.toLowerCase().includes(searchTerm) ||
                            enrollment.email.toLowerCase().includes(searchTerm) ||
                            enrollment.course.toLowerCase().includes(searchTerm);
        
        const matchesCourse = !courseFilter || enrollment.course === courseFilter;
        const matchesStatus = !statusFilter || enrollment.status === statusFilter;
        
        return matchesSearch && matchesCourse && matchesStatus;
    });
    
    // Sort results
    filtered = sortEnrollments(filtered, sortBy);
    
    renderStudentList(filtered);
}

// Sort enrollments
function sortEnrollments(enrollmentsList, sortBy) {
    const sorted = [...enrollmentsList];
    
    switch(sortBy) {
        case 'name':
            sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
            break;
        case 'course':
            sorted.sort((a, b) => a.course.localeCompare(b.course));
            break;
        case 'status':
            sorted.sort((a, b) => a.status.localeCompare(b.status));
            break;
        case 'recent':
        default:
            sorted.reverse();
            break;
    }
    
    return sorted;
}

// Export students to CSV
function exportStudents() {
    const enrollments = window.appState.enrollments;
    
    if (enrollments.length === 0) {
        alert('No students to export!');
        return;
    }
    
    let csv = 'Student ID,First Name,Last Name,Email,Phone,Date of Birth,Address,Course,Academic Year,Semester,Status,Enrollment Date\n';
    
    enrollments.forEach(enrollment => {
        csv += `"${enrollment.studentId}","${enrollment.firstName}","${enrollment.lastName}","${enrollment.email}","${enrollment.phoneNumber}","${enrollment.dateOfBirth}","${enrollment.address}","${enrollment.course}","${enrollment.academicYear}","${enrollment.semester}","${enrollment.status}","${enrollment.enrollmentDate}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('Student list exported successfully!');
}
