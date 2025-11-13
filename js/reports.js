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
        
        // Update overview statistics
        document.getElementById('reportTotalStudents').textContent = allEnrollments.length;
        
        const uniqueCourses = [...new Set(allEnrollments.map(e => e.course_name))];
        document.getElementById('reportTotalCourses').textContent = uniqueCourses.length;
        
        const enrolledCount = allEnrollments.filter(e => e.enrollment_status === 'Enrolled').length;
        document.getElementById('reportEnrolledCount').textContent = enrolledCount;
        
        const pendingCount = allEnrollments.filter(e => e.enrollment_status === 'Pending').length;
        document.getElementById('reportPendingCount').textContent = pendingCount;
        
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
        const { data: courses, error } = await supabaseClient
            .from('courses')
            .select('*')
            .order('name');
        
        if (error) throw error;
        
        const container = document.getElementById('courseEnrollmentBars');
        if (!container) return;
        
        // Count enrollments per course
        const courseCounts = {};
        enrollments.forEach(e => {
            courseCounts[e.course_name] = (courseCounts[e.course_name] || 0) + 1;
        });
        
        // Find max for percentage calculation
        const maxCount = Math.max(...Object.values(courseCounts), 1);
        
        container.innerHTML = courses.map(course => {
            const count = courseCounts[course.name] || 0;
            const percentage = (count / maxCount) * 100;
            
            return `
                <div class="mb-3">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="fw-bold">${course.name}</span>
                        <span class="text-muted">${count} students</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-warning" role="progressbar" 
                             style="width: ${percentage}%" 
                             aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${maxCount}">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error updating course enrollments:', error);
    }
}

function updateStatusDistribution(enrollments) {
    const container = document.getElementById('statusDistribution');
    if (!container) return;
    
    const statusCounts = {};
    enrollments.forEach(e => {
        statusCounts[e.enrollment_status] = (statusCounts[e.enrollment_status] || 0) + 1;
    });
    
    const total = enrollments.length || 1;
    
    container.innerHTML = Object.entries(statusCounts).map(([status, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        const bgClass = status === 'Enrolled' ? 'success' : 'warning';
        
        return `
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold">${status}</span>
                    <span class="text-muted">${count} (${percentage}%)</span>
                </div>
                <div class="progress">
                    <div class="progress-bar bg-${bgClass}" role="progressbar" 
                         style="width: ${percentage}%" 
                         aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${total}">
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateSemesterDistribution(enrollments) {
    const container = document.getElementById('semesterDistribution');
    if (!container) return;
    
    const semesterCounts = {};
    enrollments.forEach(e => {
        const semester = e.semester || 'Not specified';
        semesterCounts[semester] = (semesterCounts[semester] || 0) + 1;
    });
    
    const total = enrollments.length || 1;
    
    container.innerHTML = Object.entries(semesterCounts)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([semester, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            
            return `
                <div class="mb-3">
                    <div class="d-flex justify-content-between mb-1">
                        <span class="fw-bold">${semester}</span>
                        <span class="text-muted">${count} (${percentage}%)</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar bg-primary" role="progressbar" 
                             style="width: ${percentage}%" 
                             aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${total}">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuth();
    await updateStatistics();
});
