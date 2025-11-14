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
                    <button class="btn btn-sm btn-outline-warning" onclick="editStudent(${enrollment.id})">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteStudent(${enrollment.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

async function editStudent(id) {
    const enrollment = allEnrollments.find(e => e.id === id);
    if (!enrollment) return;
    
    // Load courses for dropdown
    const { data: courses } = await supabaseClient
        .from('courses')
        .select('*')
        .order('name');
    
    const courseOptions = courses.map(c => 
        `<option value="${c.id}" ${c.id === enrollment.course_id ? 'selected' : ''}>${c.name}</option>`
    ).join('');
    
    const modalHTML = `
        <div class="modal fade show" id="editModal" style="display: block; background: rgba(0,0,0,0.5);">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Student - ${enrollment.student_id}</h5>
                        <button type="button" class="btn-close" onclick="closeEditModal()"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editStudentForm">
                            <input type="hidden" id="editStudentDbId" value="${enrollment.id}">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">First Name</label>
                                    <input type="text" class="form-control" id="editFirstName" value="${enrollment.first_name}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Last Name</label>
                                    <input type="text" class="form-control" id="editLastName" value="${enrollment.last_name}" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Middle Name</label>
                                    <input type="text" class="form-control" id="editMiddleName" value="${enrollment.middle_name || ''}">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Email</label>
                                    <input type="email" class="form-control" id="editEmail" value="${enrollment.email}" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Phone</label>
                                    <input type="text" class="form-control" id="editPhone" value="${enrollment.phone ? enrollment.phone.replace('+63', '') : ''}">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Birth Date</label>
                                    <input type="date" class="form-control" id="editBirthDate" value="${enrollment.birth_date || ''}">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Address</label>
                                <textarea class="form-control" id="editAddress" rows="2">${enrollment.address || ''}</textarea>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Course</label>
                                    <select class="form-select" id="editCourse" required>
                                        ${courseOptions}
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Year Level</label>
                                    <select class="form-select" id="editYearLevel" required>
                                        <option value="1st Year" ${enrollment.year_level === '1st Year' ? 'selected' : ''}>1st Year</option>
                                        <option value="2nd Year" ${enrollment.year_level === '2nd Year' ? 'selected' : ''}>2nd Year</option>
                                        <option value="3rd Year" ${enrollment.year_level === '3rd Year' ? 'selected' : ''}>3rd Year</option>
                                        <option value="4th Year" ${enrollment.year_level === '4th Year' ? 'selected' : ''}>4th Year</option>
                                        <option value="5th Year" ${enrollment.year_level === '5th Year' ? 'selected' : ''}>5th Year</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Semester</label>
                                    <select class="form-select" id="editSemester" required>
                                        <option value="1st Semester" ${enrollment.semester === '1st Semester' ? 'selected' : ''}>1st Semester</option>
                                        <option value="2nd Semester" ${enrollment.semester === '2nd Semester' ? 'selected' : ''}>2nd Semester</option>
                                        <option value="Summer" ${enrollment.semester === 'Summer' ? 'selected' : ''}>Summer</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Status</label>
                                    <select class="form-select" id="editStatus" required>
                                        <option value="Pending" ${enrollment.enrollment_status === 'Pending' ? 'selected' : ''}>Pending</option>
                                        <option value="Approved" ${enrollment.enrollment_status === 'Approved' ? 'selected' : ''}>Approved</option>
                                        <option value="Enrolled" ${enrollment.enrollment_status === 'Enrolled' ? 'selected' : ''}>Enrolled</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeEditModal()">Cancel</button>
                        <button type="button" class="btn btn-warning" onclick="saveStudentEdit()">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.remove();
    }
}

async function saveStudentEdit() {
    try {
        const id = document.getElementById('editStudentDbId').value;
        const courseId = document.getElementById('editCourse').value;
        
        // Get course name
        const { data: course } = await supabaseClient
            .from('courses')
            .select('name')
            .eq('id', courseId)
            .single();
        
        const phone = document.getElementById('editPhone').value;
        
        const updateData = {
            first_name: document.getElementById('editFirstName').value,
            last_name: document.getElementById('editLastName').value,
            middle_name: document.getElementById('editMiddleName').value || null,
            email: document.getElementById('editEmail').value,
            phone: phone ? '+63' + phone : null,
            address: document.getElementById('editAddress').value || null,
            birth_date: document.getElementById('editBirthDate').value || null,
            course_id: courseId,
            course_name: course ? course.name : 'Unknown',
            year_level: document.getElementById('editYearLevel').value,
            semester: document.getElementById('editSemester').value,
            enrollment_status: document.getElementById('editStatus').value
        };
        
        const { error } = await supabaseClient
            .from('enrollments')
            .update(updateData)
            .eq('id', id);
        
        if (error) throw error;
        
        alert('Student updated successfully!');
        closeEditModal();
        await loadEnrollments();
        
    } catch (error) {
        console.error('Error updating student:', error);
        alert('Error updating student: ' + error.message);
    }
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
