// Enrollment functionality with Subject Selection - Updated for Supabase

let enrollmentData = {};
let selectedSubjects = [];

async function generateStudentId() {
    try {
        const { data: enrollments, error } = await supabaseClient
            .from('enrollments')
            .select('student_id')
            .like('student_id', '25%')
            .order('student_id', { ascending: false })
            .limit(1);
        
        if (error) throw error;
        
        let nextNumber = 1;
        
        if (enrollments && enrollments.length > 0) {
            const lastId = enrollments[0].student_id;
            const lastNumber = parseInt(lastId.substring(2));
            nextNumber = lastNumber + 1;
        }
        
        const studentId = '25' + nextNumber.toString().padStart(5, '0');
        
        const studentIdInput = document.getElementById('studentId');
        if (studentIdInput) {
            studentIdInput.value = studentId;
        }
        
        return studentId;
    } catch (error) {
        console.error('Error generating student ID:', error);
        return '2500001';
    }
}

async function loadCourses() {
    try {
        const { data: courses, error } = await supabaseClient
            .from('courses')
            .select('*')
            .order('name');
        
        if (error) throw error;
        
        const courseSelect = document.getElementById('course');
        if (courseSelect && courses) {
            courseSelect.innerHTML = '<option value="">Select a course</option>' +
                courses.map(course => 
                    `<option value="${course.id}">${course.name}</option>`
                ).join('');
        }
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

// Step 1: Validate and proceed to subject selection
async function proceedToSubjects() {
    const form = document.getElementById('enrollmentForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Store personal information
    const formData = new FormData(form);
    const courseId = formData.get('course');
    const yearLevel = formData.get('yearLevel');
    const semester = formData.get('semester');
    
    // Get course name
    const { data: course } = await supabaseClient
        .from('courses')
        .select('name')
        .eq('id', courseId)
        .single();
    
    enrollmentData = {
        student_id: document.getElementById('studentId').value,
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        middle_name: formData.get('middleName') || null,
        email: formData.get('email'),
        phone: formData.get('phone') ? '+63' + formData.get('phone') : null,
        address: formData.get('address') || null,
        birth_date: formData.get('birthDate') || null,
        course_id: courseId,
        course_name: course ? course.name : 'Unknown',
        year_level: yearLevel,
        semester: semester,
        enrollment_status: formData.get('enrollmentStatus')
    };
    
    // Hide Step 1, Show Step 2
    document.getElementById('enrollmentCard').style.display = 'none';
    document.getElementById('subjectSelectionCard').style.display = 'block';
    
    // Load subjects for selected course, year level, and semester
    await loadAvailableSubjects(courseId, yearLevel, semester);
}

function backToPersonalInfo() {
    document.getElementById('subjectSelectionCard').style.display = 'none';
    document.getElementById('enrollmentCard').style.display = 'block';
}

async function loadAvailableSubjects(courseId, yearLevel, semester) {
    try {
        // Get course details for unit limits
        const { data: courseData, error: courseError } = await supabaseClient
            .from('courses')
            .select('name')
            .eq('id', courseId)
            .single();
        
        if (courseError) throw courseError;
        
        // Query subjects filtered by course_id, year_level, and semester
        const { data: subjects, error } = await supabaseClient
            .from('subjects')
            .select('*')
            .eq('course_id', courseId)  // Filter by course
            .eq('year_level', yearLevel)
            .eq('semester', semester)
            .order('code');
        
        if (error) throw error;
        
        if (!subjects || subjects.length === 0) {
            document.getElementById('subjectsList').innerHTML = 
                `<div class="alert alert-warning">
                    No subjects available for <strong>${courseData.name}</strong>, ${yearLevel}, ${semester}.
                    <br><small class="text-muted">Please ensure subjects are configured for this course in the database.</small>
                </div>`;
            return;
        }
        
        // Get completed subjects for current student (if any)
        const { data: { user } } = await supabaseClient.auth.getUser();
        const { data: completedSubjects } = await supabaseClient
            .from('student_subjects')
            .select('subject_id, subjects(code)')
            .eq('enrollment_id', user?.id)
            .eq('status', 'completed');
        
        const completedCodes = completedSubjects?.map(s => s.subjects?.code) || [];
        
        // Load prerequisites for each subject
        const subjectsHTML = await Promise.all(subjects.map(async (subject) => {
            const prerequisites = await getPrerequisites(subject.id);
            const sections = await getSections(subject.id);
            
            // Check if prerequisites are met
            const prerequisitesMet = prerequisites.every(prereq => completedCodes.includes(prereq));
            const hasPrerequisites = prerequisites.length > 0;
            const canEnroll = !hasPrerequisites || prerequisitesMet;
            
            return `
                <div class="card mb-3 subject-card ${!canEnroll ? 'bg-light' : ''}" data-subject-id="${subject.id}">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="form-check">
                                    <input class="form-check-input subject-checkbox" type="checkbox" 
                                           id="subject_${subject.id}" 
                                           data-units="${subject.units}"
                                           ${!canEnroll ? 'disabled' : ''}
                                           onchange="toggleSubject(${subject.id})">
                                    <label class="form-check-label fw-bold ${!canEnroll ? 'text-muted' : ''}" for="subject_${subject.id}">
                                        ${subject.code} - ${subject.name}
                                    </label>
                                </div>
                                <small class="text-muted">${subject.description || ''}</small>
                                <div class="mt-2">
                                    <span class="badge bg-secondary">${subject.units} Units</span>
                                    ${hasPrerequisites ? 
                                        (prerequisitesMet ? 
                                            `<span class="badge bg-success">✓ Prerequisites: ${prerequisites.join(', ')}</span>` :
                                            `<span class="badge bg-danger">✗ Prerequisites Required: ${prerequisites.join(', ')}</span>`
                                        ) : '<span class="badge bg-success">No Prerequisites</span>'}
                                </div>
                                ${!canEnroll ? '<small class="text-danger">You must complete the prerequisite subjects first</small>' : ''}
                            </div>
                            <div class="col-md-4">
                                <label class="form-label fw-bold small">Select Section:</label>
                                <select class="form-select form-select-sm section-select" 
                                        id="section_${subject.id}" 
                                        disabled>
                                    <option value="">Choose section...</option>
                                    ${sections.map(s => 
                                        `<option value="${s.id}" ${s.enrolled_count >= s.max_students ? 'disabled' : ''}>
                                            ${s.section_name} - ${s.schedule} ${s.enrolled_count >= s.max_students ? '(FULL)' : `(${s.enrolled_count}/${s.max_students})`}
                                        </option>`
                                    ).join('')}
                                </select>
                                <small class="text-muted d-block mt-1">
                                    Room: ${sections[0]?.room || 'TBA'}<br>
                                    Instructor: ${sections[0]?.instructor || 'TBA'}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }));
        
        document.getElementById('subjectsList').innerHTML = subjectsHTML.join('');
        
    } catch (error) {
        console.error('Error loading subjects:', error);
        alert('Error loading subjects: ' + error.message);
    }
}

async function getPrerequisites(subjectId) {
    try {
        const { data: prereqs, error } = await supabaseClient
            .from('prerequisites')
            .select('prerequisite_subject_id')
            .eq('subject_id', subjectId);
        
        if (error) throw error;
        
        if (!prereqs || prereqs.length === 0) return [];
        
        // Get subject codes for prerequisites
        const codes = await Promise.all(prereqs.map(async (p) => {
            const { data: subject } = await supabaseClient
                .from('subjects')
                .select('code')
                .eq('id', p.prerequisite_subject_id)
                .single();
            return subject?.code || '';
        }));
        
        return codes.filter(c => c);
    } catch (error) {
        console.error('Error loading prerequisites:', error);
        return [];
    }
}

async function getSections(subjectId) {
    try {
        const { data: sections, error } = await supabaseClient
            .from('sections')
            .select('*')
            .eq('subject_id', subjectId);
        
        if (error) throw error;
        
        return sections || [];
    } catch (error) {
        console.error('Error loading sections:', error);
        return [];
    }
}

function toggleSubject(subjectId) {
    const checkbox = document.getElementById(`subject_${subjectId}`);
    const sectionSelect = document.getElementById(`section_${subjectId}`);
    
    if (checkbox.checked) {
        sectionSelect.disabled = false;
        sectionSelect.required = true;
        
        // Add event listener to check for schedule conflicts
        sectionSelect.addEventListener('change', checkScheduleConflicts);
    } else {
        sectionSelect.disabled = true;
        sectionSelect.required = false;
        sectionSelect.value = '';
        sectionSelect.removeEventListener('change', checkScheduleConflicts);
    }
    
    updateSelectedSummary();
    checkScheduleConflicts();
}

function checkScheduleConflicts() {
    const selectedSections = [];
    const checkboxes = document.querySelectorAll('.subject-checkbox:checked');
    
    // Collect all selected sections with their schedules
    checkboxes.forEach(checkbox => {
        const subjectId = checkbox.id.replace('subject_', '');
        const sectionSelect = document.getElementById(`section_${subjectId}`);
        
        if (sectionSelect.value) {
            const selectedOption = sectionSelect.options[sectionSelect.selectedIndex];
            const scheduleText = selectedOption.textContent;
            // Extract schedule part (e.g., "MWF 8:00-9:00 AM")
            const schedulePart = scheduleText.split(' - ')[1]?.split(' (')[0] || '';
            
            selectedSections.push({
                subjectId: subjectId,
                sectionId: sectionSelect.value,
                schedule: schedulePart,
                sectionSelect: sectionSelect
            });
        }
    });
    
    // Check for conflicts
    let hasConflict = false;
    const conflicts = [];
    
    for (let i = 0; i < selectedSections.length; i++) {
        for (let j = i + 1; j < selectedSections.length; j++) {
            if (hasScheduleConflict(selectedSections[i].schedule, selectedSections[j].schedule)) {
                hasConflict = true;
                conflicts.push({
                    section1: selectedSections[i],
                    section2: selectedSections[j]
                });
                
                // Mark conflicting sections with red border
                selectedSections[i].sectionSelect.classList.add('border-danger', 'border-3');
                selectedSections[j].sectionSelect.classList.add('border-danger', 'border-3');
            }
        }
    }
    
    // Remove conflict styling from non-conflicting sections
    if (!hasConflict) {
        document.querySelectorAll('.section-select').forEach(select => {
            select.classList.remove('border-danger', 'border-3');
        });
    }
    
    // Display conflict warning
    const existingWarning = document.getElementById('scheduleConflictWarning');
    if (existingWarning) {
        existingWarning.remove();
    }
    
    if (hasConflict) {
        const warningHTML = `
            <div class="alert alert-danger" id="scheduleConflictWarning">
                <strong>⚠️ Schedule Conflict Detected!</strong>
                <p class="mb-0">The following sections have overlapping schedules. Please select different sections:</p>
                <ul class="mb-0 mt-2">
                    ${conflicts.map(c => 
                        `<li>${c.section1.schedule} conflicts with ${c.section2.schedule}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
        document.getElementById('selectedSubjectsSummary').insertAdjacentHTML('afterend', warningHTML);
    }
    
    return !hasConflict;
}

function hasScheduleConflict(schedule1, schedule2) {
    if (!schedule1 || !schedule2) return false;
    
    // Parse schedules (e.g., "MWF 8:00-9:00 AM", "TTH 10:00-11:30 AM")
    const parsed1 = parseSchedule(schedule1);
    const parsed2 = parseSchedule(schedule2);
    
    if (!parsed1 || !parsed2) return false;
    
    // Check if days overlap
    const daysOverlap = parsed1.days.some(day => parsed2.days.includes(day));
    if (!daysOverlap) return false;
    
    // Check if times overlap
    return timeRangesOverlap(parsed1.startTime, parsed1.endTime, parsed2.startTime, parsed2.endTime);
}

function parseSchedule(schedule) {
    try {
        // Extract days and time (e.g., "MWF 8:00-9:00 AM" or "TTH 10:00-11:30 AM")
        const parts = schedule.trim().split(' ');
        if (parts.length < 2) return null;
        
        const daysStr = parts[0];
        const timeRange = parts[1];
        const period = parts[2]; // AM or PM
        
        // Parse days correctly
        // MWF -> [M, W, F]
        // TTH -> [T, H]  (T=Tuesday, H=Thursday)
        // SAT -> [S]
        const days = [];
        let i = 0;
        while (i < daysStr.length) {
            if (i < daysStr.length - 1 && daysStr[i] === 'T' && daysStr[i+1] === 'H') {
                // TTH case - T is Tuesday, TH is Thursday
                days.push('T'); // Tuesday
                days.push('H'); // Thursday
                i += 2;
            } else if (daysStr[i] === 'S' && i < daysStr.length - 2 && daysStr.substring(i, i+3) === 'SAT') {
                days.push('S'); // Saturday
                i += 3;
            } else {
                days.push(daysStr[i]);
                i++;
            }
        }
        
        // Parse time range (8:00-9:00)
        const times = timeRange.split('-');
        if (times.length !== 2) return null;
        
        // Check if end time has a different period (e.g., "11:30 AM-1:00 PM")
        let startPeriod = period;
        let endPeriod = period;
        
        // If end time contains AM/PM, extract it
        const endTimeParts = parts.slice(3).join(' ');
        if (endTimeParts.includes('AM') || endTimeParts.includes('PM')) {
            endPeriod = endTimeParts.includes('PM') ? 'PM' : 'AM';
        }
        
        const startTime = convertTo24Hour(times[0].trim(), startPeriod);
        const endTime = convertTo24Hour(times[1].trim().replace(/[^0-9:]/g, ''), endPeriod);
        
        return { days, startTime, endTime };
    } catch (error) {
        console.error('Error parsing schedule:', schedule, error);
        return null;
    }
}

function convertTo24Hour(time, period) {
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    
    if (period === 'PM' && hours !== 12) {
        hour24 = hours + 12;
    } else if (period === 'AM' && hours === 12) {
        hour24 = 0;
    }
    
    return hour24 * 60 + minutes; // Return minutes from midnight
}

function timeRangesOverlap(start1, end1, start2, end2) {
    return (start1 < end2 && end1 > start2);
}

function updateSelectedSummary() {
    const checkboxes = document.querySelectorAll('.subject-checkbox:checked');
    const totalUnits = Array.from(checkboxes).reduce((sum, cb) => sum + parseInt(cb.dataset.units), 0);
    
    document.getElementById('totalUnits').textContent = totalUnits;
    
    // Get course-specific unit limits from stored enrollment data
    // Different courses may have different requirements
    let maxUnits = 24; // Default maximum
    let minUnits = 12; // Default minimum
    
    // Adjust limits based on course type
    if (enrollmentData.course_name) {
        // Engineering courses typically allow more units
        if (enrollmentData.course_name.includes('Engineering') || enrollmentData.course_name.includes('Architecture')) {
            maxUnits = 27;
            minUnits = 15;
        }
        // Regular 4-year courses
        else {
            maxUnits = 24;
            minUnits = 12;
        }
    }
    
    let unitWarning = '';
    if (totalUnits > maxUnits) {
        unitWarning = `<div class="alert alert-danger mt-2">⚠️ Unit overload! Maximum ${maxUnits} units allowed for ${enrollmentData.course_name || 'this course'}. Current: ${totalUnits} units.</div>`;
    } else if (totalUnits < minUnits && checkboxes.length > 0) {
        unitWarning = `<div class="alert alert-warning mt-2">⚠️ Below minimum load. Minimum ${minUnits} units required for ${enrollmentData.course_name || 'this course'}. Current: ${totalUnits} units.</div>`;
    } else if (checkboxes.length > 0) {
        unitWarning = `<div class="alert alert-success mt-2">✓ Valid unit load (${minUnits}-${maxUnits} units allowed)</div>`;
    }
    
    if (checkboxes.length === 0) {
        document.getElementById('selectedSubjectsSummary').innerHTML = 
            '<p class="text-muted">No subjects selected yet</p>';
    } else {
        const summaryHTML = Array.from(checkboxes).map(cb => {
            const subjectCard = cb.closest('.subject-card');
            const label = subjectCard.querySelector('.form-check-label').textContent.trim();
            return `<div class="small">✓ ${label}</div>`;
        }).join('');
        document.getElementById('selectedSubjectsSummary').innerHTML = summaryHTML + unitWarning;
    }
    
    // Disable/enable submit button based on unit limits
    const submitBtn = document.querySelector('button[onclick="submitEnrollment()"]');
    if (submitBtn) {
        submitBtn.disabled = totalUnits < minUnits || totalUnits > maxUnits;
    }
}

async function submitEnrollment() {
    try {
        // Validate subject selection
        const checkboxes = document.querySelectorAll('.subject-checkbox:checked');
        if (checkboxes.length === 0) {
            alert('Please select at least one subject to enroll.');
            return;
        }
        
        // Validate unit limits based on course
        const totalUnits = Array.from(checkboxes).reduce((sum, cb) => sum + parseInt(cb.dataset.units), 0);
        
        let maxUnits = 24;
        let minUnits = 12;
        
        // Adjust limits based on course type
        if (enrollmentData.course_name.includes('Engineering') || enrollmentData.course_name.includes('Architecture')) {
            maxUnits = 27;
            minUnits = 15;
        }
        
        if (totalUnits < minUnits) {
            alert(`Cannot enroll: ${enrollmentData.course_name} requires a minimum of ${minUnits} units. Current: ${totalUnits} units.`);
            return;
        }
        if (totalUnits > maxUnits) {
            alert(`Cannot enroll: ${enrollmentData.course_name} allows a maximum of ${maxUnits} units per semester. Current: ${totalUnits} units.`);
            return;
        }
        
        // Validate section selection
        for (const checkbox of checkboxes) {
            const subjectId = checkbox.id.replace('subject_', '');
            const sectionSelect = document.getElementById(`section_${subjectId}`);
            if (!sectionSelect.value) {
                alert('Please select a section for all chosen subjects.');
                return;
            }
        }
        
        // Check for schedule conflicts before submitting
        if (!checkScheduleConflicts()) {
            alert('Cannot complete enrollment: Schedule conflicts detected. Please resolve conflicts before submitting.');
            return;
        }
        
        // Get current user session
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            alert('Please log in to enroll');
            window.location.href = 'login.html';
            return;
        }
        
        // Insert main enrollment record
        const { data: enrollment, error: enrollError } = await supabaseClient
            .from('enrollments')
            .insert([{
                ...enrollmentData,
                user_id: session.user.id
            }])
            .select()
            .single();
        
        if (enrollError) throw enrollError;
        
        // Insert student subjects
        const studentSubjects = Array.from(checkboxes).map(checkbox => {
            const subjectId = checkbox.id.replace('subject_', '');
            const sectionId = document.getElementById(`section_${subjectId}`).value;
            
            return {
                enrollment_id: enrollment.id,
                subject_id: parseInt(subjectId),
                section_id: parseInt(sectionId),
                status: 'Enrolled'
            };
        });
        
        const { error: subjectsError } = await supabaseClient
            .from('student_subjects')
            .insert(studentSubjects);
        
        if (subjectsError) throw subjectsError;
        
        // Update section enrolled counts
        for (const checkbox of checkboxes) {
            const subjectId = checkbox.id.replace('subject_', '');
            const sectionId = document.getElementById(`section_${subjectId}`).value;
            
            const { data: section } = await supabaseClient
                .from('sections')
                .select('enrolled_count')
                .eq('id', sectionId)
                .single();
            
            if (section) {
                await supabaseClient
                    .from('sections')
                    .update({ enrolled_count: section.enrolled_count + 1 })
                    .eq('id', sectionId);
            }
        }
        
        // Decrement course available slots
        const { data: currentCourse } = await supabaseClient
            .from('courses')
            .select('available_slots')
            .eq('id', enrollmentData.course_id)
            .single();
        
        if (currentCourse && currentCourse.available_slots > 0) {
            await supabaseClient
                .from('courses')
                .update({ available_slots: currentCourse.available_slots - 1 })
                .eq('id', enrollmentData.course_id);
        }
        
        alert('Enrollment completed successfully!');
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Error submitting enrollment:', error);
        alert('Error submitting enrollment: ' + error.message);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuth();
    await generateStudentId();
    await loadCourses();
    
    // Add phone number validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    }
});
