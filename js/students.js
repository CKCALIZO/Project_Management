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
    
    // Get enrolled subjects
    const { data: studentSubjects } = await supabaseClient
        .from('student_subjects')
        .select(`
            *,
            subjects:subject_id(code, name, units),
            sections:section_id(section_name, schedule)
        `)
        .eq('enrollment_id', enrollment.id);
    
    const totalUnits = studentSubjects?.reduce((sum, ss) => sum + (ss.subjects?.units || 0), 0) || 0;
    
    const subjectsSection = studentSubjects && studentSubjects.length > 0 ? `
        <div class="card bg-light mb-3">
            <div class="card-body">
                <h6 class="card-title fw-bold">Enrolled Subjects (${totalUnits} units)</h6>
                <div class="table-responsive">
                    <table class="table table-sm table-bordered mb-0">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Subject</th>
                                <th>Units</th>
                                <th>Section</th>
                                <th>Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${studentSubjects.map(ss => `
                                <tr>
                                    <td><strong>${ss.subjects?.code}</strong></td>
                                    <td>${ss.subjects?.name}</td>
                                    <td class="text-center">${ss.subjects?.units}</td>
                                    <td>${ss.sections?.section_name}</td>
                                    <td><small>${ss.sections?.schedule}</small></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <small class="text-muted">To modify enrolled subjects, please contact the registrar.</small>
            </div>
        </div>
    ` : '<div class="alert alert-info">No subjects enrolled yet. Student can enroll through the enrollment page.</div>';
    
    const modalHTML = `
        <div class="modal fade show" id="editModal" style="display: block; background: rgba(0,0,0,0.5);">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Student - ${enrollment.student_id}</h5>
                        <button type="button" class="btn-close" onclick="closeEditModal()"></button>
                    </div>
                    <div class="modal-body">
                        ${subjectsSection}
                        <form id="editStudentForm">
                            <input type="hidden" id="editStudentDbId" value="${enrollment.id}">
                            <h6 class="fw-bold mb-3">Personal Information</h6>
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label class="form-label fw-bold">First Name</label>
                                    <input type="text" class="form-control" id="editFirstName" value="${enrollment.first_name}" required>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label class="form-label fw-bold">Last Name</label>
                                    <input type="text" class="form-control" id="editLastName" value="${enrollment.last_name}" required>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label class="form-label fw-bold">Middle Name</label>
                                    <input type="text" class="form-control" id="editMiddleName" value="${enrollment.middle_name || ''}">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label fw-bold">Email</label>
                                    <input type="email" class="form-control" id="editEmail" value="${enrollment.email}" required>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label class="form-label fw-bold">Phone</label>
                                    <input type="text" class="form-control" id="editPhone" value="${enrollment.phone ? enrollment.phone.replace('+63', '') : ''}" placeholder="9XXXXXXXXX">
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label class="form-label fw-bold">Birth Date</label>
                                    <input type="date" class="form-control" id="editBirthDate" value="${enrollment.birth_date || ''}">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Address</label>
                                <textarea class="form-control" id="editAddress" rows="2">${enrollment.address || ''}</textarea>
                            </div>
                            <hr>
                            <h6 class="fw-bold mb-3">Academic Information</h6>
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
    
    // Get enrolled subjects for this student
    const { data: studentSubjects, error } = await supabaseClient
        .from('student_subjects')
        .select(`
            *,
            subjects:subject_id(code, name, units),
            sections:section_id(section_name, schedule, room, instructor)
        `)
        .eq('enrollment_id', enrollment.id);
    
    if (error) {
        console.error('Error loading student subjects:', error);
    }
    
    const totalUnits = studentSubjects?.reduce((sum, ss) => sum + (ss.subjects?.units || 0), 0) || 0;
    
    const subjectsHTML = studentSubjects && studentSubjects.length > 0 ? `
        <div class="table-responsive mt-3">
            <h6 class="fw-bold">Enrolled Subjects (${studentSubjects.length} subjects, ${totalUnits} units)</h6>
            <table class="table table-sm table-bordered">
                <thead class="table-light">
                    <tr>
                        <th>Code</th>
                        <th>Subject Name</th>
                        <th>Units</th>
                        <th>Section</th>
                        <th>Schedule</th>
                        <th>Room</th>
                        <th>Instructor</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${studentSubjects.map(ss => `
                        <tr>
                            <td><strong>${ss.subjects?.code || 'N/A'}</strong></td>
                            <td>${ss.subjects?.name || 'N/A'}</td>
                            <td class="text-center">${ss.subjects?.units || 0}</td>
                            <td>${ss.sections?.section_name || 'N/A'}</td>
                            <td><small>${ss.sections?.schedule || 'TBA'}</small></td>
                            <td><small>${ss.sections?.room || 'TBA'}</small></td>
                            <td><small>${ss.sections?.instructor || 'TBA'}</small></td>
                            <td><span class="badge bg-${ss.status === 'completed' ? 'success' : 'info'}">${ss.status || 'enrolled'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    ` : '<p class="text-muted mt-3">No subjects enrolled yet</p>';
    
    const modalHTML = `
        <div class="modal fade show" id="viewModal" style="display: block; background: rgba(0,0,0,0.5);">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-warning">
                        <h5 class="modal-title">Student Details - ${enrollment.student_id}</h5>
                        <button type="button" class="btn-close" onclick="closeViewModal()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="fw-bold text-warning">Personal Information</h6>
                                <table class="table table-sm">
                                    <tr><th width="40%">Student ID:</th><td>${enrollment.student_id}</td></tr>
                                    <tr><th>Name:</th><td>${enrollment.first_name} ${enrollment.middle_name || ''} ${enrollment.last_name}</td></tr>
                                    <tr><th>Email:</th><td>${enrollment.email}</td></tr>
                                    <tr><th>Phone:</th><td>${enrollment.phone || 'N/A'}</td></tr>
                                    <tr><th>Birth Date:</th><td>${enrollment.birth_date ? new Date(enrollment.birth_date).toLocaleDateString() : 'N/A'}</td></tr>
                                    <tr><th>Address:</th><td>${enrollment.address || 'N/A'}</td></tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold text-warning">Academic Information</h6>
                                <table class="table table-sm">
                                    <tr><th width="40%">Course:</th><td><strong>${enrollment.course_name}</strong></td></tr>
                                    <tr><th>Year Level:</th><td>${enrollment.year_level || 'N/A'}</td></tr>
                                    <tr><th>Semester:</th><td>${enrollment.semester || 'N/A'}</td></tr>
                                    <tr><th>Status:</th><td><span class="badge bg-${enrollment.enrollment_status === 'Enrolled' ? 'success' : 'warning'}">${enrollment.enrollment_status}</span></td></tr>
                                    <tr><th>Enrollment Date:</th><td>${new Date(enrollment.enrollment_date).toLocaleDateString()}</td></tr>
                                    <tr><th>Total Units:</th><td><strong>${totalUnits} units</strong></td></tr>
                                </table>
                            </div>
                        </div>
                        <hr>
                        ${subjectsHTML}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeViewModal()">Close</button>
                        <button type="button" class="btn btn-warning" onclick="closeViewModal(); editStudent(${enrollment.id})">Edit Student</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeViewModal() {
    const modal = document.getElementById('viewModal');
    if (modal) {
        modal.remove();
    }
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
    
    // Get enrolled subjects for all students
    const exportData = await Promise.all(filteredEnrollments.map(async (e) => {
        const { data: studentSubjects } = await supabaseClient
            .from('student_subjects')
            .select('subjects:subject_id(code, units)')
            .eq('enrollment_id', e.id);
        
        const totalUnits = studentSubjects?.reduce((sum, ss) => sum + (ss.subjects?.units || 0), 0) || 0;
        const subjectCodes = studentSubjects?.map(ss => ss.subjects?.code).join('; ') || 'None';
        
        return {
            ...e,
            totalUnits,
            subjectCodes
        };
    }));
    
    // Create CSV content with subjects
    const headers = ['Student ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Course', 'Year Level', 'Semester', 'Total Units', 'Enrolled Subjects', 'Status', 'Enrollment Date'];
    const rows = exportData.map(e => [
        e.student_id,
        e.first_name,
        e.last_name,
        e.email,
        e.phone || '',
        e.course_name,
        e.year_level || '',
        e.semester || '',
        e.totalUnits,
        e.subjectCodes,
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
