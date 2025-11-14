// Reports functionality - Updated for Supabase

async function updateStatistics() {
    try {
        console.log('Loading report statistics...');
        const { data: enrollments, error } = await supabaseClient
            .from('enrollments')
            .select('*');
        
        if (error) {
            console.error('Error fetching enrollments:', error);
            throw error;
        }
        
        console.log('Report enrollments loaded:', enrollments);
        const allEnrollments = enrollments || [];
        
        // Calculate enrollment rate (assuming we compare against total available slots)
        const { data: courses } = await supabaseClient
            .from('courses')
            .select('available_slots');
        
        let totalSlots = 0;
        if (courses) {
            totalSlots = courses.reduce((sum, course) => sum + course.available_slots, 0);
        }
        const enrollmentRate = totalSlots > 0 ? Math.round((allEnrollments.length / (allEnrollments.length + totalSlots)) * 100) : 0;
        const enrollmentRateEl = document.getElementById('enrollmentRate');
        if (enrollmentRateEl) {
            enrollmentRateEl.textContent = enrollmentRate + '%';
        }
        
        // Find most popular course
        const courseCounts = {};
        allEnrollments.forEach(e => {
            courseCounts[e.course_name] = (courseCounts[e.course_name] || 0) + 1;
        });
        
        let popularCourse = '-';
        let maxCount = 0;
        for (const [course, count] of Object.entries(courseCounts)) {
            if (count > maxCount) {
                maxCount = count;
                popularCourse = course;
            }
        }
        
        const popularCourseEl = document.getElementById('popularCourse');
        const popularCourseCountEl = document.getElementById('popularCourseCount');
        if (popularCourseEl) popularCourseEl.textContent = popularCourse;
        if (popularCourseCountEl) popularCourseCountEl.textContent = maxCount + ' students';
        
        // Calculate approval rate (enrolled / total)
        const enrolledCount = allEnrollments.filter(e => e.enrollment_status === 'Enrolled').length;
        const approvalRate = allEnrollments.length > 0 ? Math.round((enrolledCount / allEnrollments.length) * 100) : 0;
        const approvalRateEl = document.getElementById('approvalRate');
        if (approvalRateEl) {
            approvalRateEl.textContent = approvalRate + '%';
        }
        
        // Update enrollment by course
        await updateEnrollmentByCourse(allEnrollments);
        
        // Update status distribution
        updateStatusDistribution(allEnrollments);
        
        // Update semester distribution
        updateSemesterDistribution(allEnrollments);
        
    } catch (error) {
        console.error('Error updating statistics:', error);
    }
}

async function updateEnrollmentByCourse(enrollments) {
    try {
        console.log('Updating enrollment by course...');
        
        // Count enrollments per course
        const courseCounts = {};
        enrollments.forEach(e => {
            courseCounts[e.course_name] = (courseCounts[e.course_name] || 0) + 1;
        });
        
        console.log('Course counts:', courseCounts);
        
        // Find max for percentage calculation
        const maxCount = Math.max(...Object.values(courseCounts), 1);
        
        // Map course names to their HTML element IDs
        const courseMapping = {
            'Computer Science': { count: 'csCount', bar: 'csBar' },
            'Information Technology': { count: 'itCount', bar: 'itBar' },
            'Business Administration': { count: 'baCount', bar: 'baBar' },
            'Civil Engineering': { count: 'ceCount', bar: 'ceBar' },
            'Mechanical Engineering': { count: 'meCount', bar: 'meBar' },
            'Electrical Engineering': { count: 'eeCount', bar: 'eeBar' },
            'Accountancy': { count: 'accCount', bar: 'accBar' },
            'Psychology': { count: 'psyCount', bar: 'psyBar' },
            'Education': { count: 'eduCount', bar: 'eduBar' },
            'Marketing': { count: 'mktCount', bar: 'mktBar' },
            'Architecture': { count: 'archCount', bar: 'archBar' }
        };
        
        // Update each course's count and progress bar
        for (const [courseName, ids] of Object.entries(courseMapping)) {
            const count = courseCounts[courseName] || 0;
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            
            const countEl = document.getElementById(ids.count);
            const barEl = document.getElementById(ids.bar);
            
            if (countEl) {
                countEl.textContent = count;
            }
            if (barEl) {
                barEl.style.width = percentage + '%';
            }
        }
        
        console.log('Enrollment by course updated');
        
    } catch (error) {
        console.error('Error updating enrollment by course:', error);
    }
}

function updateStatusDistribution(enrollments) {
    console.log('Updating status distribution...');
    
    const statusCounts = {
        'Pending': 0,
        'Approved': 0,
        'Enrolled': 0
    };
    
    enrollments.forEach(e => {
        if (statusCounts.hasOwnProperty(e.enrollment_status)) {
            statusCounts[e.enrollment_status]++;
        }
    });
    
    console.log('Status counts:', statusCounts);
    
    const total = enrollments.length || 1;
    
    // Update Pending
    const pendingCountEl = document.getElementById('pendingCount');
    const pendingBarEl = document.getElementById('pendingBar');
    if (pendingCountEl) pendingCountEl.textContent = statusCounts['Pending'];
    if (pendingBarEl) pendingBarEl.style.width = ((statusCounts['Pending'] / total) * 100) + '%';
    
    // Update Approved
    const approvedCountEl = document.getElementById('approvedCount');
    const approvedBarEl = document.getElementById('approvedBar');
    if (approvedCountEl) approvedCountEl.textContent = statusCounts['Approved'];
    if (approvedBarEl) approvedBarEl.style.width = ((statusCounts['Approved'] / total) * 100) + '%';
    
    // Update Enrolled
    const enrolledCountEl = document.getElementById('enrolledCount');
    const enrolledBarEl = document.getElementById('enrolledBar');
    if (enrolledCountEl) enrolledCountEl.textContent = statusCounts['Enrolled'];
    if (enrolledBarEl) enrolledBarEl.style.width = ((statusCounts['Enrolled'] / total) * 100) + '%';
    
    console.log('Status distribution updated');
}

function updateSemesterDistribution(enrollments) {
    console.log('Updating semester distribution...');
    
    const semesterCounts = {
        '1st Semester': 0,
        '2nd Semester': 0,
        'Summer': 0
    };
    
    enrollments.forEach(e => {
        if (semesterCounts.hasOwnProperty(e.semester)) {
            semesterCounts[e.semester]++;
        }
    });
    
    console.log('Semester counts:', semesterCounts);
    
    const total = enrollments.length || 1;
    
    // Update 1st Semester
    const sem1CountEl = document.getElementById('sem1Count');
    const sem1BarEl = document.getElementById('sem1Bar');
    if (sem1CountEl) sem1CountEl.textContent = semesterCounts['1st Semester'];
    if (sem1BarEl) sem1BarEl.style.width = ((semesterCounts['1st Semester'] / total) * 100) + '%';
    
    // Update 2nd Semester
    const sem2CountEl = document.getElementById('sem2Count');
    const sem2BarEl = document.getElementById('sem2Bar');
    if (sem2CountEl) sem2CountEl.textContent = semesterCounts['2nd Semester'];
    if (sem2BarEl) sem2BarEl.style.width = ((semesterCounts['2nd Semester'] / total) * 100) + '%';
    
    // Update Summer
    const summerCountEl = document.getElementById('summerCount');
    const summerBarEl = document.getElementById('summerBar');
    if (summerCountEl) summerCountEl.textContent = semesterCounts['Summer'];
    if (summerBarEl) summerBarEl.style.width = ((semesterCounts['Summer'] / total) * 100) + '%';
    
    console.log('Semester distribution updated');
}

// Generate Report (CSV and PDF)
async function generateReport() {
    try {
        const { data: enrollments, error } = await supabaseClient
            .from('enrollments')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Generate CSV
        generateCSVReport(enrollments || []);
        
        // Generate PDF
        generatePDFReport(enrollments || []);
        
    } catch (error) {
        console.error('Error generating report:', error);
        alert('Error generating report: ' + error.message);
    }
}

function generateCSVReport(enrollments) {
    // CSV Headers
    const headers = ['Student ID', 'Name', 'Email', 'Phone', 'Course', 'Year Level', 'Semester', 'Status', 'Enrollment Date'];
    
    // CSV Rows
    const rows = enrollments.map(e => [
        e.student_id,
        `${e.first_name} ${e.last_name}`,
        e.email,
        e.phone || 'N/A',
        e.course_name,
        e.year_level || 'N/A',
        e.semester || 'N/A',
        e.enrollment_status,
        new Date(e.enrollment_date).toLocaleDateString()
    ]);
    
    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enrollment_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('CSV report generated');
}

function generatePDFReport(enrollments) {
    // Create PDF content as HTML
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    // Calculate statistics
    const totalStudents = enrollments.length;
    const enrolledCount = enrollments.filter(e => e.enrollment_status === 'Enrolled').length;
    const courseCounts = {};
    enrollments.forEach(e => {
        courseCounts[e.course_name] = (courseCounts[e.course_name] || 0) + 1;
    });
    
    let pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Enrollment Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { color: #ffc107; text-align: center; }
        .header { text-align: center; margin-bottom: 30px; }
        .stats { display: flex; gap: 20px; margin: 20px 0; }
        .stat-box { flex: 1; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #ffc107; color: #000; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        tr:hover { background-color: #f5f5f5; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Enrollment System Report</h1>
        <p>Generated on ${date} at ${time}</p>
    </div>
    
    <div class="stats">
        <div class="stat-box">
            <h3>${totalStudents}</h3>
            <p>Total Students</p>
        </div>
        <div class="stat-box">
            <h3>${enrolledCount}</h3>
            <p>Active Enrollments</p>
        </div>
        <div class="stat-box">
            <h3>${Object.keys(courseCounts).length}</h3>
            <p>Courses</p>
        </div>
    </div>
    
    <h2>Enrollment Details</h2>
    <table>
        <thead>
            <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Year Level</th>
                <th>Semester</th>
                <th>Status</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
`;

    enrollments.forEach(e => {
        pdfContent += `
            <tr>
                <td>${e.student_id}</td>
                <td>${e.first_name} ${e.last_name}</td>
                <td>${e.course_name}</td>
                <td>${e.year_level || 'N/A'}</td>
                <td>${e.semester || 'N/A'}</td>
                <td>${e.enrollment_status}</td>
                <td>${new Date(e.enrollment_date).toLocaleDateString()}</td>
            </tr>
        `;
    });

    pdfContent += `
        </tbody>
    </table>
    
    <div class="footer">
        <p>Enrollment Management System - All Rights Reserved</p>
    </div>
</body>
</html>
`;

    // Open PDF in new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    // Trigger print dialog after content loads
    printWindow.onload = function() {
        printWindow.print();
    };
    
    console.log('PDF report generated');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuth();
    await updateStatistics();
});
