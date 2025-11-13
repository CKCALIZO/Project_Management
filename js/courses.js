// Courses functionality - Updated for Supabase

let allCourses = [];
let enrollmentCounts = {};

async function loadCourses() {
    try {
        const { data: courses, error } = await supabaseClient
            .from('courses')
            .select('*')
            .order('name');
        
        if (error) throw error;
        
        allCourses = courses || [];
        await loadEnrollmentCounts();
        renderCourses();
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

async function loadEnrollmentCounts() {
    try {
        console.log('Loading enrollment counts...');
        const { data: enrollments, error } = await supabaseClient
            .from('enrollments')
            .select('course_id, course_name');
        
        if (error) {
            console.error('Error loading enrollment counts:', error);
            throw error;
        }
        
        console.log('Enrollments for courses:', enrollments);
        // Count enrollments per course
        enrollmentCounts = {};
        enrollments.forEach(e => {
            enrollmentCounts[e.course_id] = (enrollmentCounts[e.course_id] || 0) + 1;
        });
        console.log('Enrollment counts:', enrollmentCounts);
    } catch (error) {
        console.error('Error loading enrollment counts:', error);
    }
}

function renderCourses() {
    console.log('Rendering courses...');
    console.log('All courses:', allCourses);
    console.log('Enrollment counts:', enrollmentCounts);
    
    allCourses.forEach(course => {
        const count = enrollmentCounts[course.id] || 0;
        console.log(`Course ${course.name} (ID: ${course.id}): ${count} enrolled, ${course.available_slots} slots`);
        
        // Find the course card by course ID
        const courseCard = document.querySelector(`[data-course-id="${course.id}"]`);
        console.log('Found card for', course.name, ':', !!courseCard);
        
        if (courseCard) {
            // Update enrollment count
            const enrolledSpan = courseCard.querySelector('.enrolled-count');
            if (enrolledSpan) {
                enrolledSpan.textContent = `${count} enrolled`;
                console.log('Updated enrollment count for', course.name);
            }
            
            // Update available slots
            const slotsElements = courseCard.querySelectorAll('.fw-bold');
            slotsElements.forEach(el => {
                if (el.previousElementSibling && 
                    el.previousElementSibling.textContent.includes('Available Slots')) {
                    el.textContent = course.available_slots;
                    console.log('Updated slots for', course.name, 'to', course.available_slots);
                }
            });
        }
    });
    console.log('Courses rendered');
}

function filterCourses() {
    const department = document.getElementById('filterDepartment').value;
    const sortBy = document.getElementById('sortCourses').value;
    const searchQuery = document.getElementById('searchCourse').value.toLowerCase();
    
    const cards = document.querySelectorAll('[data-department]');
    
    cards.forEach(card => {
        const cardDepartment = card.getAttribute('data-department');
        const courseName = card.querySelector('h4').textContent.toLowerCase();
        
        const matchesDepartment = !department || cardDepartment === department;
        const matchesSearch = !searchQuery || courseName.includes(searchQuery);
        
        if (matchesDepartment && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Sort visible cards
    if (sortBy === 'enrolled') {
        // Sort by enrollment count (would need more complex logic)
    }
}

// Add course IDs to cards for easier updates
function addCourseIdsToCards() {
    console.log('Adding course IDs to cards...');
    const courseMapping = {
        'Computer Science': 1,
        'Information Technology': 2,
        'Business Administration': 3,
        'Civil Engineering': 4,
        'Mechanical Engineering': 5,
        'Electrical Engineering': 6,
        'Accountancy': 7,
        'Psychology': 8,
        'Education': 9,
        'Marketing': 10,
        'Architecture': 11
    };
    
    const cards = document.querySelectorAll('.course-card');
    console.log('Found', cards.length, 'course cards');
    
    cards.forEach(card => {
        const courseName = card.querySelector('h4').textContent.trim();
        const courseId = courseMapping[courseName];
        console.log('Processing:', courseName, '-> ID:', courseId);
        
        if (courseId) {
            card.parentElement.setAttribute('data-course-id', courseId);
            
            // Update enrolled count span
            const enrolledSpan = card.querySelector('.text-muted:last-child');
            if (enrolledSpan && !enrolledSpan.classList.contains('enrolled-count')) {
                enrolledSpan.classList.add('enrolled-count');
            }
        }
    });
    console.log('Course IDs added');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuth();
    addCourseIdsToCards();
    await loadCourses();
    
    // Set up event listeners
    document.getElementById('searchCourse')?.addEventListener('input', filterCourses);
    document.getElementById('filterDepartment')?.addEventListener('change', filterCourses);
    document.getElementById('sortCourses')?.addEventListener('change', filterCourses);
});
