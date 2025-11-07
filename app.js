// Enrollment System JavaScript

// Data Storage
let enrollments = [];
let currentId = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    updateDashboard();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', handleEnrollmentSubmit);
    }

    const searchStudent = document.getElementById('searchStudent');
    if (searchStudent) {
        searchStudent.addEventListener('input', handleSearch);
    }

    const searchCourse = document.getElementById('searchCourse');
    if (searchCourse) {
        searchCourse.addEventListener('input', filterCourses);
    }
}

// Navigation Functions
function showDashboard() {
    hideAllSections();
    document.getElementById('dashboardSection').style.display = 'block';
    updateDashboard();
}

function showEnrollmentForm() {
    hideAllSections();
    document.getElementById('enrollmentFormSection').style.display = 'block';
}

function showStudentList() {
    hideAllSections();
    document.getElementById('studentListSection').style.display = 'block';
    renderStudentList();
}

function showCourseList() {
    hideAllSections();
    document.getElementById('courseListSection').style.display = 'block';
    updateCourseEnrollments();
}

function showStatistics() {
    hideAllSections();
    document.getElementById('statisticsSection').style.display = 'block';
    updateStatistics();
}

function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

// Form Submission Handler
function handleEnrollmentSubmit(e) {
    e.preventDefault();

    const enrollment = {
        id: currentId++,
        studentId: document.getElementById('studentId').value,
        email: document.getElementById('studentEmail').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        address: document.getElementById('address').value,
        course: document.getElementById('courseSelect').value,
        academicYear: document.getElementById('academicYear').value,
        semester: document.getElementById('semester').value,
        status: document.getElementById('enrollmentStatus').value,
        enrollmentDate: new Date().toLocaleDateString()
    };

    enrollments.push(enrollment);
    saveToLocalStorage();

    // Show success message
    alert('Enrollment submitted successfully!');

    // Reset form and return to dashboard
    document.getElementById('enrollmentForm').reset();
    showDashboard();
}

// Update Dashboard
function updateDashboard() {
    // Update statistics
    document.getElementById('totalStudents').textContent = enrollments.length;
    document.getElementById('activeEnrollments').textContent = 
        enrollments.filter(e => e.status === 'Enrolled').length;
    document.getElementById('pendingReviews').textContent = 
        enrollments.filter(e => e.status === 'Pending').length;

    // Update recent enrollments table
    renderRecentEnrollments();
}

// Render Recent Enrollments
function renderRecentEnrollments() {
    const tableBody = document.getElementById('recentEnrollmentsTable');
    
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

// Render Student List
function renderStudentList(filteredEnrollments = null) {
    const tableBody = document.getElementById('studentListTable');
    const displayEnrollments = filteredEnrollments || enrollments;
    
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

// Search Handler
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    const filtered = enrollments.filter(enrollment => {
        return enrollment.firstName.toLowerCase().includes(searchTerm) ||
               enrollment.lastName.toLowerCase().includes(searchTerm) ||
               enrollment.studentId.toLowerCase().includes(searchTerm) ||
               enrollment.email.toLowerCase().includes(searchTerm) ||
               enrollment.course.toLowerCase().includes(searchTerm);
    });

    renderStudentList(filtered);
}

// Apply Filters
function applyFilters() {
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase();
    const courseFilter = document.getElementById('filterCourse').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const sortBy = document.getElementById('sortBy').value;
    
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

// Sort Enrollments
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

// Update Course Enrollments
function updateCourseEnrollments() {
    const courseCounts = getCourseEnrollmentCounts();

    document.getElementById('csEnrolled').textContent = `${courseCounts['Computer Science']} enrolled`;
    document.getElementById('itEnrolled').textContent = `${courseCounts['Information Technology']} enrolled`;
    document.getElementById('baEnrolled').textContent = `${courseCounts['Business Administration']} enrolled`;
    document.getElementById('ceEnrolled').textContent = `${courseCounts['Civil Engineering']} enrolled`;
    document.getElementById('meEnrolled').textContent = `${courseCounts['Mechanical Engineering']} enrolled`;
    document.getElementById('eeEnrolled').textContent = `${courseCounts['Electrical Engineering']} enrolled`;
    document.getElementById('accEnrolled').textContent = `${courseCounts['Accountancy']} enrolled`;
    document.getElementById('psyEnrolled').textContent = `${courseCounts['Psychology']} enrolled`;
    document.getElementById('nurEnrolled').textContent = `${courseCounts['Nursing']} enrolled`;
    document.getElementById('eduEnrolled').textContent = `${courseCounts['Education']} enrolled`;
    document.getElementById('marEnrolled').textContent = `${courseCounts['Marketing']} enrolled`;
    document.getElementById('arcEnrolled').textContent = `${courseCounts['Architecture']} enrolled`;
}

// Get Course Enrollment Counts
function getCourseEnrollmentCounts() {
    const courseCounts = {
        'Computer Science': 0,
        'Information Technology': 0,
        'Business Administration': 0,
        'Civil Engineering': 0,
        'Mechanical Engineering': 0,
        'Electrical Engineering': 0,
        'Accountancy': 0,
        'Psychology': 0,
        'Nursing': 0,
        'Education': 0,
        'Marketing': 0,
        'Architecture': 0
    };

    enrollments.forEach(enrollment => {
        if (courseCounts.hasOwnProperty(enrollment.course)) {
            courseCounts[enrollment.course]++;
        }
    });
    
    return courseCounts;
}

// Filter Courses
function filterCourses() {
    const searchTerm = document.getElementById('searchCourse').value.toLowerCase();
    const department = document.getElementById('filterDepartment').value;
    const sortBy = document.getElementById('sortCourses').value;
    
    const courseCards = document.querySelectorAll('#courseContainer > div');
    const courseCounts = getCourseEnrollmentCounts();
    
    let visibleCourses = [];
    
    courseCards.forEach(card => {
        const courseName = card.querySelector('h4').textContent;
        const cardDepartment = card.getAttribute('data-department');
        
        const matchesSearch = courseName.toLowerCase().includes(searchTerm);
        const matchesDepartment = !department || cardDepartment === department;
        
        if (matchesSearch && matchesDepartment) {
            card.style.display = 'block';
            visibleCourses.push({
                element: card,
                name: courseName,
                count: courseCounts[courseName] || 0
            });
        } else {
            card.style.display = 'none';
        }
    });
    
    // Sort visible courses
    if (sortBy === 'enrolled') {
        visibleCourses.sort((a, b) => b.count - a.count);
    } else if (sortBy === 'name') {
        visibleCourses.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Reorder in DOM
    const container = document.getElementById('courseContainer');
    visibleCourses.forEach(course => {
        container.appendChild(course.element);
    });
}

// Update Statistics
function updateStatistics() {
    const courseCounts = getCourseEnrollmentCounts();
    const maxCount = Math.max(...Object.values(courseCounts), 1);

    // Update all course bars
    updateCourseBar('cs', courseCounts['Computer Science'], maxCount);
    updateCourseBar('it', courseCounts['Information Technology'], maxCount);
    updateCourseBar('ba', courseCounts['Business Administration'], maxCount);
    updateCourseBar('ce', courseCounts['Civil Engineering'], maxCount);
    updateCourseBar('me', courseCounts['Mechanical Engineering'], maxCount);
    updateCourseBar('ee', courseCounts['Electrical Engineering'], maxCount);
    updateCourseBar('acc', courseCounts['Accountancy'], maxCount);
    updateCourseBar('psy', courseCounts['Psychology'], maxCount);
    updateCourseBar('nur', courseCounts['Nursing'], maxCount);
    updateCourseBar('edu', courseCounts['Education'], maxCount);
    updateCourseBar('mar', courseCounts['Marketing'], maxCount);
    updateCourseBar('arc', courseCounts['Architecture'], maxCount);
    
    // Update status distribution
    updateStatusDistribution();
    
    // Update semester distribution
    updateSemesterDistribution();
    
    // Update report metrics
    updateReportMetrics(courseCounts);
}

// Helper function to update course bar
function updateCourseBar(prefix, count, maxCount) {
    const countElement = document.getElementById(`${prefix}Count`);
    const barElement = document.getElementById(`${prefix}Bar`);
    
    if (countElement) countElement.textContent = count;
    if (barElement) barElement.style.width = `${(count / maxCount) * 100}%`;
}

// Update Status Distribution
function updateStatusDistribution() {
    const statusCounts = {
        'Pending': 0,
        'Approved': 0,
        'Enrolled': 0
    };
    
    enrollments.forEach(enrollment => {
        if (statusCounts.hasOwnProperty(enrollment.status)) {
            statusCounts[enrollment.status]++;
        }
    });
    
    const maxCount = Math.max(...Object.values(statusCounts), 1);
    
    document.getElementById('pendingCount').textContent = statusCounts['Pending'];
    document.getElementById('pendingBar').style.width = `${(statusCounts['Pending'] / maxCount) * 100}%`;
    
    document.getElementById('approvedCount').textContent = statusCounts['Approved'];
    document.getElementById('approvedBar').style.width = `${(statusCounts['Approved'] / maxCount) * 100}%`;
    
    document.getElementById('enrolledCount').textContent = statusCounts['Enrolled'];
    document.getElementById('enrolledBar').style.width = `${(statusCounts['Enrolled'] / maxCount) * 100}%`;
}

// Update Semester Distribution
function updateSemesterDistribution() {
    const semesterCounts = {
        '1st Semester': 0,
        '2nd Semester': 0,
        'Summer': 0
    };
    
    enrollments.forEach(enrollment => {
        if (semesterCounts.hasOwnProperty(enrollment.semester)) {
            semesterCounts[enrollment.semester]++;
        }
    });
    
    const maxCount = Math.max(...Object.values(semesterCounts), 1);
    
    document.getElementById('sem1Count').textContent = semesterCounts['1st Semester'];
    document.getElementById('sem1Bar').style.width = `${(semesterCounts['1st Semester'] / maxCount) * 100}%`;
    
    document.getElementById('sem2Count').textContent = semesterCounts['2nd Semester'];
    document.getElementById('sem2Bar').style.width = `${(semesterCounts['2nd Semester'] / maxCount) * 100}%`;
    
    document.getElementById('summerCount').textContent = semesterCounts['Summer'];
    document.getElementById('summerBar').style.width = `${(semesterCounts['Summer'] / maxCount) * 100}%`;
}

// Update Report Metrics
function updateReportMetrics(courseCounts) {
    // Enrollment Rate (placeholder calculation)
    const enrollmentRate = enrollments.length > 0 ? 100 : 0;
    document.getElementById('enrollmentRate').textContent = `${enrollmentRate}%`;
    
    // Most Popular Course
    const popularCourse = Object.entries(courseCounts).reduce((a, b) => b[1] > a[1] ? b : a, ['None', 0]);
    document.getElementById('popularCourse').textContent = popularCourse[0];
    document.getElementById('popularCourseCount').textContent = `${popularCourse[1]} students`;
    
    // Approval Rate
    const approvedCount = enrollments.filter(e => e.status === 'Approved' || e.status === 'Enrolled').length;
    const approvalRate = enrollments.length > 0 ? Math.round((approvedCount / enrollments.length) * 100) : 0;
    document.getElementById('approvalRate').textContent = `${approvalRate}%`;
}

// Generate Report
function generateReport() {
    const courseCounts = getCourseEnrollmentCounts();
    const totalStudents = enrollments.length;
    
    let reportText = `ENROLLMENT SYSTEM REPORT\n`;
    reportText += `Generated: ${new Date().toLocaleString()}\n\n`;
    reportText += `SUMMARY\n`;
    reportText += `Total Students: ${totalStudents}\n`;
    reportText += `Active Enrollments: ${enrollments.filter(e => e.status === 'Enrolled').length}\n`;
    reportText += `Pending Reviews: ${enrollments.filter(e => e.status === 'Pending').length}\n\n`;
    reportText += `COURSE BREAKDOWN\n`;
    
    Object.entries(courseCounts).forEach(([course, count]) => {
        reportText += `${course}: ${count} students\n`;
    });
    
    alert(reportText);
}

// Export Students to CSV
function exportStudents() {
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

// Edit Enrollment
function editEnrollment(id) {
    const enrollment = enrollments.find(e => e.id === id);
    if (enrollment) {
        // Fill form with existing data
        document.getElementById('studentId').value = enrollment.studentId;
        document.getElementById('studentEmail').value = enrollment.email;
        document.getElementById('firstName').value = enrollment.firstName;
        document.getElementById('lastName').value = enrollment.lastName;
        document.getElementById('phoneNumber').value = enrollment.phoneNumber;
        document.getElementById('dateOfBirth').value = enrollment.dateOfBirth;
        document.getElementById('address').value = enrollment.address;
        document.getElementById('courseSelect').value = enrollment.course;
        document.getElementById('academicYear').value = enrollment.academicYear;
        document.getElementById('semester').value = enrollment.semester;
        document.getElementById('enrollmentStatus').value = enrollment.status;
        
        // Delete old enrollment
        enrollments = enrollments.filter(e => e.id !== id);
        saveToLocalStorage();
        
        // Show form
        showEnrollmentForm();
        alert('Edit the student information and submit to update.');
    }
}

// View Enrollment Details
function viewEnrollment(id) {
    const enrollment = enrollments.find(e => e.id === id);
    if (enrollment) {
        const details = `
Student ID: ${enrollment.studentId}
Name: ${enrollment.firstName} ${enrollment.lastName}
Email: ${enrollment.email}
Phone: ${enrollment.phoneNumber}
Date of Birth: ${enrollment.dateOfBirth}
Address: ${enrollment.address}
Course: ${enrollment.course}
Academic Year: ${enrollment.academicYear}
Semester: ${enrollment.semester}
Status: ${enrollment.status}
Enrollment Date: ${enrollment.enrollmentDate}
        `;
        alert(details);
    }
}

// Delete Enrollment
function deleteEnrollment(id) {
    if (confirm('Are you sure you want to delete this enrollment?')) {
        enrollments = enrollments.filter(e => e.id !== id);
        saveToLocalStorage();
        updateDashboard();
        renderStudentList();
        alert('Enrollment deleted successfully!');
    }
}

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    localStorage.setItem('currentId', currentId.toString());
}

function loadFromLocalStorage() {
    const savedEnrollments = localStorage.getItem('enrollments');
    const savedId = localStorage.getItem('currentId');
    
    if (savedEnrollments) {
        enrollments = JSON.parse(savedEnrollments);
    }
    
    if (savedId) {
        currentId = parseInt(savedId);
    }
}