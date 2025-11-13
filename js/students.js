// Students functionality - Updated for Supabase

let allEnrollments = [];
let filteredEnrollments = [];

async function loadEnrollments() {
    try {
        console.log('Loading enrollments...');
        const { data: enrollments, error } = await supabaseClient
            .from('enrollments')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error loading enrollments:', error);
            throw error;
        }
        
        console.log('Enrollments loaded:', enrollments);
        allEnrollments = enrollments || [];
        filteredEnrollments = [...allEnrollments];
        renderStudentList();
    } catch (error) {
        console.error('Error loading enrollments:', error);
    }
}

function applyFilters() {
    const courseFilter = document.getElementById('filterCourse').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const searchQuery = document.getElementById('searchStudent').value.toLowerCase();
    
    filteredEnrollments = allEnrollments.filter(enrollment => {
        const matchesCourse = !courseFilter || enrollment.course_name === courseFilter;
        const matchesStatus = !statusFilter || enrollment.enrollment_status === statusFilter;
        const matchesSearch = !searchQuery || 
            enrollment.first_name.toLowerCase().includes(searchQuery) ||
            enrollment.last_name.toLowerCase().includes(searchQuery) ||
            enrollment.student_id.toLowerCase().includes(searchQuery) ||
            enrollment.email.toLowerCase().includes(searchQuery);
        
        return matchesCourse && matchesStatus && matchesSearch;
    });
    
    renderStudentList();
}

function sortEnrollments() {
    const sortBy = document.getElementById('sortBy').value;
    
    filteredEnrollments.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.first_name.localeCompare(b.first_name);
            case 'id':
                return a.student_id.localeCompare(b.student_id);
            case 'course':
                return a.course_name.localeCompare(b.course_name);
            case 'date':
                return new Date(b.enrollment_date) - new Date(a.enrollment_date);
            default:
                return 0;
        }
    });
    
    renderStudentList();
}

function renderStudentList() {
    const tbody = document.getElementById('studentListTable');
    if (!tbody) {
        console.error('Table body not found!');
        return;
    }
    
    console.log('Rendering', filteredEnrollments.length, 'students');
    
    if (filteredEnrollments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No students found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredEnrollments.map(enrollment => {
        const statusClass = enrollment.enrollment_status === 'Enrolled' ? 'success' : 'warning';
        const enrollmentDate = new Date(enrollment.enrollment_date).toLocaleDateString();
        
        return `
            <tr>
                <td>${enrollment.student_id}</td>
                <td>${enrollment.first_name} ${enrollment.last_name}</td>
                <td>${enrollment.email}</td>
                <td>${enrollment.phone || 'N/A'}</td>
                <td>${enrollment.course_name}</td>
                <td>${enrollment.year_level || 'N/A'}</td>
                <td>${enrollment.semester || 'N/A'}</td>
                <td><span class="badge bg-${statusClass}">${enrollment.enrollment_status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewStudent(${enrollment.id})">View</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteStudent(${enrollment.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

async function viewStudent(id) {
    const enrollment = allEnrollments.find(e => e.id === id);
    if (!enrollment) return;
    
    const details = `
Student ID: ${enrollment.student_id}
Name: ${enrollment.first_name} ${enrollment.middle_name || ''} ${enrollment.last_name}
Email: ${enrollment.email}
Phone: ${enrollment.phone || 'N/A'}
Address: ${enrollment.address || 'N/A'}
Birth Date: ${enrollment.birth_date || 'N/A'}
Gender: ${enrollment.gender}
Course: ${enrollment.course_name}
Year Level: ${enrollment.year_level}
Semester: ${enrollment.semester}
Status: ${enrollment.enrollment_status}
Enrollment Date: ${new Date(enrollment.enrollment_date).toLocaleDateString()}
    `;
    alert(details);
}

async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this enrollment?')) return;
    
    try {
        const { error } = await supabaseClient
            .from('enrollments')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        alert('Enrollment deleted successfully!');
        await loadEnrollments();
    } catch (error) {
        console.error('Error deleting enrollment:', error);
        alert('Error deleting enrollment: ' + error.message);
    }
}

async function exportStudents() {
    if (filteredEnrollments.length === 0) {
        alert('No students to export');
        return;
    }
    
    // Create CSV content
    const headers = ['Student ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Course', 'Year Level', 'Status', 'Enrollment Date'];
    const rows = filteredEnrollments.map(e => [
        e.student_id,
        e.first_name,
        e.last_name,
        e.email,
        e.phone || '',
        e.course_name,
        e.year_level || '',
        e.enrollment_status,
        new Date(e.enrollment_date).toLocaleDateString()
    ]);
    
    let csvContent = headers.join(',') + '\n';
    csvContent += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// Load unique courses for filter
async function loadCourseFilter() {
    try {
        const { data: courses, error } = await supabaseClient
            .from('courses')
            .select('name')
            .order('name');
        
        if (error) throw error;
        
        const courseFilter = document.getElementById('filterCourse');
        if (courseFilter && courses) {
            courseFilter.innerHTML = '<option value="">All Courses</option>' +
                courses.map(course => `<option value="${course.name}">${course.name}</option>`).join('');
        }
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuth();
    await loadCourseFilter();
    await loadEnrollments();
    
    // Set up event listeners
    document.getElementById('searchStudent')?.addEventListener('input', applyFilters);
    document.getElementById('filterCourse')?.addEventListener('change', applyFilters);
    document.getElementById('filterStatus')?.addEventListener('change', applyFilters);
    document.getElementById('sortBy')?.addEventListener('change', sortEnrollments);
});
