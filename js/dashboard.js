// Dashboard functionality - Updated for Supabase

async function updateDashboard() {
    try {
        // Get all enrollments from Supabase
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            console.log('No session found');
            return;
        }
        
        console.log('Fetching enrollments...');
        const { data: enrollments, error } = await supabaseClient
            .from('enrollments')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching enrollments:', error);
            throw error;
        }
        
        console.log('Enrollments fetched:', enrollments);
        const allEnrollments = enrollments || [];
        
        // Update statistics
        document.getElementById('totalStudents').textContent = allEnrollments.length;
        
        // Get unique courses
        const uniqueCourses = [...new Set(allEnrollments.map(e => e.course_name))];
        document.getElementById('totalCourses').textContent = uniqueCourses.length;
        
        // Count by status
        const enrolledCount = allEnrollments.filter(e => e.enrollment_status === 'Enrolled').length;
        document.getElementById('enrolledCount').textContent = enrolledCount;
        
        const pendingCount = allEnrollments.filter(e => e.enrollment_status === 'Pending').length;
        document.getElementById('pendingCount').textContent = pendingCount;
        
        // Render recent enrollments
        renderRecentEnrollments(allEnrollments);
        
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

function renderRecentEnrollments(enrollments) {
    const tbody = document.getElementById('recentEnrollmentsTable');
    if (!tbody) return;
    
    // Get last 5 enrollments
    const recent = enrollments.slice(0, 5);
    
    if (recent.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No enrollments yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = recent.map(enrollment => {
        const date = new Date(enrollment.enrollment_date).toLocaleDateString();
        const statusClass = enrollment.enrollment_status === 'Enrolled' ? 'success' : 'warning';
        
        return `
            <tr>
                <td>${enrollment.student_id}</td>
                <td>${enrollment.first_name} ${enrollment.last_name}</td>
                <td>${enrollment.course_name}</td>
                <td><span class="badge bg-${statusClass}">${enrollment.enrollment_status}</span></td>
                <td>${date}</td>
            </tr>
        `;
    }).join('');
}

// Load dashboard on page load
document.addEventListener('DOMContentLoaded', async function() {
    const session = await checkAuth();
    if (session) {
        await updateDashboard();
    }
});
