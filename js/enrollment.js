// Enrollment functionality - Updated for Supabase

async function generateStudentId() {
    try {
        // Query for the highest student ID with format 25XXXXX
        const { data: enrollments, error } = await supabaseClient
            .from('enrollments')
            .select('student_id')
            .like('student_id', '25%')
            .order('student_id', { ascending: false })
            .limit(1);
        
        if (error) throw error;
        
        let nextNumber = 1; // Start with 00001
        
        if (enrollments && enrollments.length > 0) {
            const lastId = enrollments[0].student_id;
            // Extract the numeric part (remove '25' prefix)
            const lastNumber = parseInt(lastId.substring(2));
            nextNumber = lastNumber + 1;
        }
        
        // Format: 25 + 5-digit padding (e.g., 2500001, 2511251)
        const studentId = '25' + nextNumber.toString().padStart(5, '0');
        
        // Set the readonly input field
        const studentIdInput = document.getElementById('studentId');
        if (studentIdInput) {
            studentIdInput.value = studentId;
        }
        
        return studentId;
    } catch (error) {
        console.error('Error generating student ID:', error);
        return '2500001'; // Fallback to first ID
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

async function handleEnrollmentSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        // Get current user session
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            alert('Please log in to enroll');
            window.location.href = 'login.html';
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const courseId = formData.get('course');
        
        // Get course name
        const { data: course } = await supabaseClient
            .from('courses')
            .select('name')
            .eq('id', courseId)
            .single();
        
        // Get student ID from the readonly field (already generated on page load)
        const studentId = document.getElementById('studentId').value;
        
        // Get phone number and add +63 prefix
        const phoneNumber = formData.get('phone');
        const fullPhoneNumber = phoneNumber ? '+63' + phoneNumber : null;
        
        // Prepare enrollment data
        const enrollmentData = {
            user_id: session.user.id,
            student_id: studentId,
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            middle_name: formData.get('middleName') || null,
            email: formData.get('email'),
            phone: fullPhoneNumber,
            address: formData.get('address') || null,
            birth_date: formData.get('birthDate') || null,
            course_id: courseId,
            course_name: course ? course.name : 'Unknown',
            year_level: formData.get('yearLevel'),
            semester: formData.get('semester'),
            enrollment_status: 'Enrolled'
        };
        
        // Insert into Supabase
        const { data, error } = await supabaseClient
            .from('enrollments')
            .insert([enrollmentData])
            .select();
        
        if (error) throw error;
        
        // Decrement available slots for the course
        const { data: currentCourse } = await supabaseClient
            .from('courses')
            .select('available_slots')
            .eq('id', courseId)
            .single();
        
        if (currentCourse && currentCourse.available_slots > 0) {
            await supabaseClient
                .from('courses')
                .update({ available_slots: currentCourse.available_slots - 1 })
                .eq('id', courseId);
        }
        
        alert('Enrollment submitted successfully!');
        form.reset();
        window.location.href = 'index.html';
        
    } catch (error) {
        console.error('Error submitting enrollment:', error);
        alert('Error submitting enrollment: ' + error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enrollment';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuth();
    await generateStudentId(); // Generate student ID on page load
    await loadCourses();
    
    // Add phone number validation - numbers only
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove any non-digit characters
            this.value = this.value.replace(/\D/g, '');
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    }
    
    const form = document.getElementById('enrollmentForm');
    if (form) {
        form.addEventListener('submit', handleEnrollmentSubmit);
    }
});
