// Reports and Statistics Functions

// Update all statistics
function updateStatistics() {
    const enrollments = window.appState.enrollments;
    const courseCounts = getCourseEnrollmentCounts(enrollments);
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
    
    // Update other distributions
    updateStatusDistribution();
    updateSemesterDistribution();
    updateReportMetrics(courseCounts);
}

// Helper function to update course bar
function updateCourseBar(prefix, count, maxCount) {
    const countElement = document.getElementById(`${prefix}Count`);
    const barElement = document.getElementById(`${prefix}Bar`);
    
    if (countElement) countElement.textContent = count;
    if (barElement) barElement.style.width = `${(count / maxCount) * 100}%`;
}

// Update status distribution
function updateStatusDistribution() {
    const enrollments = window.appState.enrollments;
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

// Update semester distribution
function updateSemesterDistribution() {
    const enrollments = window.appState.enrollments;
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

// Update report metrics
function updateReportMetrics(courseCounts) {
    const enrollments = window.appState.enrollments;
    
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

// Generate report
function generateReport() {
    const enrollments = window.appState.enrollments;
    const courseCounts = getCourseEnrollmentCounts(enrollments);
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
