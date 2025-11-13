// Course Management Functions

// Update course enrollments
function updateCourseEnrollments() {
    const courseCounts = getCourseEnrollmentCounts(window.appState.enrollments);

    document.getElementById('csEnrolled').textContent = `${courseCounts['Computer Science']} enrolled`;
    document.getElementById('itEnrolled').textContent = `${courseCounts['Information Technology']} enrolled`;
    document.getElementById('baEnrolled').textContent = `${courseCounts['Business Administration']} enrolled`;
    document.getElementById('ceEnrolled').textContent = `${courseCounts['Civil Engineering']} enrolled`;
    document.getElementById('meEnrolled').textContent = `${courseCounts['Mechanical Engineering']} enrolled`;
    document.getElementById('eeEnrolled').textContent = `${courseCounts['Electrical Engineering']} enrolled`;
    document.getElementById('accEnrolled').textContent = `${courseCounts['Accountancy']} enrolled`;
    document.getElementById('psyEnrolled').textContent = `${courseCounts['Psychology']} enrolled`;
    document.getElementById('nurEnrolled').textContent = `${courseCounts['Nursing']} enrolled`;
    document.getElementById('eduEnrolled').textContent = `${courseCounts['Education']} enrolled`;
    document.getElementById('marEnrolled').textContent = `${courseCounts['Marketing']} enrolled`;
    document.getElementById('arcEnrolled').textContent = `${courseCounts['Architecture']} enrolled`;
}

// Filter courses
function filterCourses() {
    const searchTerm = document.getElementById('searchCourse').value.toLowerCase();
    const department = document.getElementById('filterDepartment').value;
    const sortBy = document.getElementById('sortCourses').value;
    
    const courseCards = document.querySelectorAll('#courseContainer > div');
    const courseCounts = getCourseEnrollmentCounts(window.appState.enrollments);
    
    let visibleCourses = [];
    
    courseCards.forEach(card => {
        const courseName = card.querySelector('h4').textContent;
        const cardDepartment = card.getAttribute('data-department');
        
        const matchesSearch = courseName.toLowerCase().includes(searchTerm);
        const matchesDepartment = !department || cardDepartment === department;
        
        if (matchesSearch && matchesDepartment) {
            card.style.display = 'block';
            visibleCourses.push({
                element: card,
                name: courseName,
                count: courseCounts[courseName] || 0
            });
        } else {
            card.style.display = 'none';
        }
    });
    
    // Sort visible courses
    if (sortBy === 'enrolled') {
        visibleCourses.sort((a, b) => b.count - a.count);
    } else if (sortBy === 'name') {
        visibleCourses.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Reorder in DOM
    const container = document.getElementById('courseContainer');
    visibleCourses.forEach(course => {
        container.appendChild(course.element);
    });
}
