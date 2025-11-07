// Data Management

// Available courses data
const coursesData = {
    'Computer Science': {
        department: 'Technology',
        duration: '4 Years',
        units: '160 Units',
        slots: 50
    },
    'Information Technology': {
        department: 'Technology',
        duration: '4 Years',
        units: '156 Units',
        slots: 45
    },
    'Business Administration': {
        department: 'Business',
        duration: '4 Years',
        units: '152 Units',
        slots: 60
    },
    'Civil Engineering': {
        department: 'Engineering',
        duration: '5 Years',
        units: '180 Units',
        slots: 40
    },
    'Mechanical Engineering': {
        department: 'Engineering',
        duration: '5 Years',
        units: '180 Units',
        slots: 35
    },
    'Electrical Engineering': {
        department: 'Engineering',
        duration: '5 Years',
        units: '180 Units',
        slots: 35
    },
    'Accountancy': {
        department: 'Business',
        duration: '4 Years',
        units: '158 Units',
        slots: 40
    },
    'Psychology': {
        department: 'Social Sciences',
        duration: '4 Years',
        units: '150 Units',
        slots: 30
    },
    'Education': {
        department: 'Education',
        duration: '4 Years',
        units: '148 Units',
        slots: 45
    },
    'Marketing': {
        department: 'Business',
        duration: '4 Years',
        units: '150 Units',
        slots: 40
    },
    'Architecture': {
        department: 'Engineering',
        duration: '5 Years',
        units: '175 Units',
        slots: 25
    }
};

// Get course enrollment counts
function getCourseEnrollmentCounts(enrollments) {
    const courseCounts = {};
    
    Object.keys(coursesData).forEach(course => {
        courseCounts[course] = 0;
    });

    enrollments.forEach(enrollment => {
        if (courseCounts.hasOwnProperty(enrollment.course)) {
            courseCounts[enrollment.course]++;
        }
    });
    
    return courseCounts;
}
