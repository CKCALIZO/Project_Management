// Enrollment Management

// Handle form submission
function handleEnrollmentSubmit(e) {
    e.preventDefault();

    const enrollment = {
        id: window.appState.currentId++,
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

    window.appState.enrollments.push(enrollment);
    saveToLocalStorage(window.appState.enrollments, window.appState.currentId);

    alert('Enrollment submitted successfully!');
    document.getElementById('enrollmentForm').reset();
    showDashboard();
}

// View enrollment details
function viewEnrollment(id) {
    const enrollment = window.appState.enrollments.find(e => e.id === id);
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

// Edit enrollment
function editEnrollment(id) {
    const enrollment = window.appState.enrollments.find(e => e.id === id);
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
        window.appState.enrollments = window.appState.enrollments.filter(e => e.id !== id);
        saveToLocalStorage(window.appState.enrollments, window.appState.currentId);
        
        showEnrollmentForm();
        alert('Edit the student information and submit to update.');
    }
}

// Delete enrollment
function deleteEnrollment(id) {
    if (confirm('Are you sure you want to delete this enrollment?')) {
        window.appState.enrollments = window.appState.enrollments.filter(e => e.id !== id);
        saveToLocalStorage(window.appState.enrollments, window.appState.currentId);
        updateDashboard();
        renderStudentList();
        alert('Enrollment deleted successfully!');
    }
}
