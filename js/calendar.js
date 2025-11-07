// Calendar functionality

function loadCalendarEvents() {
    const events = loadFromLocalStorage('calendarEvents') || getDefaultCalendarEvents();
    return events;
}

function getDefaultCalendarEvents() {
    // Based on SY 2025-2026 Academic Calendar
    return [
        // JUNE 2025
        { id: 1, semester: '1st-2025-2026', date: '2025-06-02', name: 'General Faculty Meeting', type: 'Academic', description: 'All faculty members' },
        { id: 2, semester: '1st-2025-2026', date: '2025-06-03', name: 'Department Faculty Meeting', type: 'Academic', description: 'Department meetings' },
        { id: 3, semester: '1st-2025-2026', date: '2025-06-12', name: 'Independence Day', type: 'Holiday', description: 'National Holiday - No classes' },
        { id: 4, semester: '1st-2025-2026', date: '2025-06-16', name: 'Online Enrollment Begins', type: 'Enrollment', description: 'Start of enrollment period' },
        { id: 5, semester: '1st-2025-2026', date: '2025-06-23', name: 'First Day of Classes', type: 'Academic', description: '1st Semester AY 2025-2026' },
        
        // JULY 2025
        { id: 6, semester: '1st-2025-2026', date: '2025-07-04', name: 'Late Registration Period Ends', type: 'Enrollment', description: 'Last day for late enrollment' },
        { id: 7, semester: '1st-2025-2026', date: '2025-07-18', name: 'Last Day of Adding/Dropping', type: 'Academic', description: 'Course changes deadline' },
        
        // AUGUST 2025
        { id: 8, semester: '1st-2025-2026', date: '2025-08-21', name: 'Ninoy Aquino Day', type: 'Holiday', description: 'National Holiday - No classes' },
        { id: 9, semester: '1st-2025-2026', date: '2025-08-25', name: 'National Heroes Day', type: 'Holiday', description: 'National Holiday - No classes' },
        
        // OCTOBER 2025
        { id: 10, semester: '1st-2025-2026', date: '2025-10-13', name: 'Midterm Examination Week Begins', type: 'Exam', description: 'Start of midterm exams' },
        { id: 11, semester: '1st-2025-2026', date: '2025-10-18', name: 'Midterm Examination Week Ends', type: 'Exam', description: 'End of midterm exams' },
        
        // NOVEMBER 2025
        { id: 12, semester: '1st-2025-2026', date: '2025-11-01', name: 'All Saints Day', type: 'Holiday', description: 'National Holiday - No classes' },
        { id: 13, semester: '1st-2025-2026', date: '2025-11-02', name: 'All Souls Day', type: 'Holiday', description: 'Special Holiday - No classes' },
        { id: 14, semester: '1st-2025-2026', date: '2025-11-30', name: 'Bonifacio Day', type: 'Holiday', description: 'National Holiday - No classes' },
        
        // DECEMBER 2025
        { id: 15, semester: '1st-2025-2026', date: '2025-12-08', name: 'Final Examination Week Begins', type: 'Exam', description: 'Start of final exams' },
        { id: 16, semester: '1st-2025-2026', date: '2025-12-13', name: 'Final Examination Week Ends', type: 'Exam', description: 'End of final exams' },
        { id: 17, semester: '1st-2025-2026', date: '2025-12-16', name: 'End of 1st Semester', type: 'Academic', description: 'Last day of 1st semester' },
        { id: 18, semester: '1st-2025-2026', date: '2025-12-17', name: 'Christmas Break Begins', type: 'Break', description: 'Start of Christmas vacation' },
        { id: 19, semester: '1st-2025-2026', date: '2025-12-25', name: 'Christmas Day', type: 'Holiday', description: 'National Holiday' },
        { id: 20, semester: '1st-2025-2026', date: '2025-12-30', name: 'Rizal Day', type: 'Holiday', description: 'National Holiday' },
        
        // JANUARY 2026
        { id: 21, semester: '2nd-2025-2026', date: '2026-01-01', name: 'New Year Day', type: 'Holiday', description: 'National Holiday' },
        { id: 22, semester: '2nd-2025-2026', date: '2026-01-05', name: 'General Faculty Meeting', type: 'Academic', description: '2nd semester preparation' },
        { id: 23, semester: '2nd-2025-2026', date: '2026-01-06', name: 'Department Faculty Meeting', type: 'Academic', description: 'Department meetings' },
        { id: 24, semester: '2nd-2025-2026', date: '2026-01-12', name: 'Online Enrollment Begins', type: 'Enrollment', description: '2nd semester enrollment' },
        { id: 25, semester: '2nd-2025-2026', date: '2026-01-19', name: 'First Day of Classes', type: 'Academic', description: '2nd Semester AY 2025-2026' },
        
        // FEBRUARY 2026
        { id: 26, semester: '2nd-2025-2026', date: '2026-02-06', name: 'Late Registration Period Ends', type: 'Enrollment', description: 'Last day for late enrollment' },
        { id: 27, semester: '2nd-2025-2026', date: '2026-02-20', name: 'Last Day of Adding/Dropping', type: 'Academic', description: 'Course changes deadline' },
        { id: 28, semester: '2nd-2025-2026', date: '2026-02-25', name: 'EDSA Revolution Anniversary', type: 'Holiday', description: 'National Holiday - No classes' },
        
        // MARCH 2026
        { id: 29, semester: '2nd-2025-2026', date: '2026-03-16', name: 'Midterm Examination Week Begins', type: 'Exam', description: 'Start of midterm exams' },
        { id: 30, semester: '2nd-2025-2026', date: '2026-03-21', name: 'Midterm Examination Week Ends', type: 'Exam', description: 'End of midterm exams' },
        
        // APRIL 2026
        { id: 31, semester: '2nd-2025-2026', date: '2026-04-02', name: 'Maundy Thursday', type: 'Holiday', description: 'Holy Week - No classes' },
        { id: 32, semester: '2nd-2025-2026', date: '2026-04-03', name: 'Good Friday', type: 'Holiday', description: 'Holy Week - No classes' },
        { id: 33, semester: '2nd-2025-2026', date: '2026-04-04', name: 'Black Saturday', type: 'Holiday', description: 'Holy Week - No classes' },
        { id: 34, semester: '2nd-2025-2026', date: '2026-04-09', name: 'Araw ng Kagitingan', type: 'Holiday', description: 'National Holiday - No classes' },
        
        // MAY 2026
        { id: 35, semester: '2nd-2025-2026', date: '2026-05-01', name: 'Labor Day', type: 'Holiday', description: 'National Holiday - No classes' },
        { id: 36, semester: '2nd-2025-2026', date: '2026-05-11', name: 'Final Examination Week Begins', type: 'Exam', description: 'Start of final exams' },
        { id: 37, semester: '2nd-2025-2026', date: '2026-05-16', name: 'Final Examination Week Ends', type: 'Exam', description: 'End of final exams' },
        { id: 38, semester: '2nd-2025-2026', date: '2026-05-19', name: 'End of 2nd Semester', type: 'Academic', description: 'Last day of 2nd semester' },
        { id: 39, semester: '2nd-2025-2026', date: '2026-05-22', name: 'Summer Break Begins', type: 'Break', description: 'Start of summer vacation' }
    ];
}

function renderYearCalendar() {
    const events = loadCalendarEvents();
    const selectedSemester = document.getElementById('semesterSelect').value;
    const yearCalendarDiv = document.getElementById('yearCalendar');
    
    // Determine which months to display based on semester
    let startMonth, endMonth, year;
    if (selectedSemester === '1st-2025-2026') {
        startMonth = 5; // June (0-indexed)
        endMonth = 11; // December
        year = 2025;
    } else if (selectedSemester === '2nd-2025-2026') {
        startMonth = 0; // January
        endMonth = 4; // May
        year = 2026;
    } else {
        startMonth = 0;
        endMonth = 11;
        year = 2025;
    }
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    let calendarHTML = '';
    
    for (let month = startMonth; month <= endMonth; month++) {
        calendarHTML += renderMonthCalendar(year, month, monthNames[month], events, selectedSemester);
    }
    
    yearCalendarDiv.innerHTML = calendarHTML;
}

function renderMonthCalendar(year, month, monthName, allEvents, semester) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Filter events for this month
    const monthEvents = allEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === month && 
               eventDate.getFullYear() === year &&
               event.semester === semester;
    });
    
    let html = `
        <div class="col-md-4 col-lg-3">
            <div class="card h-100">
                <div class="card-header bg-warning text-dark fw-bold text-center">
                    ${monthName} ${year}
                </div>
                <div class="card-body p-2">
                    <table class="table table-sm table-borderless mb-0" style="font-size: 0.85rem;">
                        <thead>
                            <tr class="text-center">
                                <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    let day = 1;
    for (let i = 0; i < 6; i++) {
        html += '<tr class="text-center">';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                html += '<td></td>';
            } else if (day > daysInMonth) {
                html += '<td></td>';
            } else {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayEvents = monthEvents.filter(e => e.date === dateStr);
                
                let cellClass = '';
                let title = '';
                if (dayEvents.length > 0) {
                    const event = dayEvents[0];
                    if (event.type === 'Holiday') cellClass = 'bg-success text-white';
                    else if (event.type === 'Exam') cellClass = 'bg-danger text-white';
                    else if (event.type === 'Break') cellClass = 'bg-info text-white';
                    else if (event.type === 'Enrollment') cellClass = 'bg-warning';
                    else if (event.type === 'Academic') cellClass = 'bg-primary text-white';
                    
                    title = dayEvents.map(e => e.name).join(', ');
                }
                
                html += `<td class="${cellClass}" title="${title}" style="cursor: pointer; padding: 5px;">${day}</td>`;
                day++;
            }
        }
        html += '</tr>';
        if (day > daysInMonth) break;
    }
    
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

function renderCalendarEvents() {
    const events = loadCalendarEvents();
    const selectedSemester = document.getElementById('semesterSelect').value;
    const tbody = document.getElementById('calendarEventsTable');
    
    const filteredEvents = events.filter(event => event.semester === selectedSemester);
    
    // Sort by date
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (filteredEvents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">No events scheduled for this semester</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredEvents.map(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        // Badge color based on event type
        let badgeClass = 'bg-secondary';
        if (event.type === 'Academic') badgeClass = 'bg-primary';
        else if (event.type === 'Enrollment') badgeClass = 'bg-warning text-dark';
        else if (event.type === 'Exam') badgeClass = 'bg-danger';
        else if (event.type === 'Holiday') badgeClass = 'bg-success';
        else if (event.type === 'Break') badgeClass = 'bg-info';
        
        return `
            <tr>
                <td>${formattedDate}</td>
                <td><strong>${event.name}</strong></td>
                <td><span class="badge ${badgeClass}">${event.type}</span></td>
                <td>${event.description || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteEvent(${event.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function addEvent() {
    console.log('addEvent function called');
    
    const date = document.getElementById('eventDate').value;
    const name = document.getElementById('eventName').value;
    const type = document.getElementById('eventType').value;
    const description = document.getElementById('eventDescription').value;
    const semester = document.getElementById('semesterSelect').value;
    
    console.log('Form values:', { date, name, type, description, semester });
    
    if (!date || !name || !type) {
        alert('Please fill in all required fields');
        return;
    }
    
    const events = loadCalendarEvents();
    const newEvent = {
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        semester: semester,
        date: date,
        name: name,
        type: type,
        description: description
    };
    
    console.log('New event:', newEvent);
    
    events.push(newEvent);
    saveToLocalStorage('calendarEvents', events);
    
    console.log('Event saved to localStorage');
    
    // Reset form
    document.getElementById('addEventForm').reset();
    
    // Close modal
    const modalElement = document.getElementById('addEventModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }
    
    // Re-render
    renderYearCalendar();
    renderCalendarEvents();
    
    console.log('Calendar re-rendered');
    
    // Show success message
    alert('Event added successfully!');
}

function deleteEvent(id) {
    if (!confirm('Are you sure you want to delete this event?')) {
        return;
    }
    
    let events = loadCalendarEvents();
    events = events.filter(event => event.id !== id);
    saveToLocalStorage('calendarEvents', events);
    renderYearCalendar();
    renderCalendarEvents();
}

// Export calendar to PDF
async function exportCalendarToPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const selectedSemester = document.getElementById('semesterSelect').value;
    const semesterText = document.getElementById('semesterSelect').selectedOptions[0].text;
    const events = loadCalendarEvents().filter(e => e.semester === selectedSemester);
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Title
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('School Calendar', 105, 20, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text(semesterText, 105, 28, { align: 'center' });
    
    // Legend
    pdf.setFontSize(10);
    let yPos = 38;
    pdf.text('Legend:', 15, yPos);
    pdf.setFillColor(40, 167, 69); // Green
    pdf.rect(35, yPos - 3, 4, 4, 'F');
    pdf.text('Holiday', 41, yPos);
    
    pdf.setFillColor(220, 53, 69); // Red
    pdf.rect(65, yPos - 3, 4, 4, 'F');
    pdf.text('Exam', 71, yPos);
    
    pdf.setFillColor(13, 110, 253); // Blue
    pdf.rect(90, yPos - 3, 4, 4, 'F');
    pdf.text('Academic', 96, yPos);
    
    pdf.setFillColor(255, 193, 7); // Yellow
    pdf.rect(125, yPos - 3, 4, 4, 'F');
    pdf.text('Enrollment', 131, yPos);
    
    pdf.setFillColor(13, 202, 240); // Light Blue
    pdf.rect(165, yPos - 3, 4, 4, 'F');
    pdf.text('Break', 171, yPos);
    
    // Events table
    yPos = 50;
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('Date', 15, yPos);
    pdf.text('Event', 50, yPos);
    pdf.text('Type', 130, yPos);
    
    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(9);
    yPos += 5;
    
    // Draw line
    pdf.line(15, yPos, 195, yPos);
    yPos += 5;
    
    events.forEach(event => {
        if (yPos > 270) {
            pdf.addPage();
            yPos = 20;
        }
        
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        // Set color based on type
        if (event.type === 'Holiday') pdf.setTextColor(40, 167, 69);
        else if (event.type === 'Exam') pdf.setTextColor(220, 53, 69);
        else if (event.type === 'Academic') pdf.setTextColor(13, 110, 253);
        else if (event.type === 'Enrollment') pdf.setTextColor(255, 165, 0);
        else if (event.type === 'Break') pdf.setTextColor(13, 202, 240);
        else pdf.setTextColor(0, 0, 0);
        
        pdf.text(formattedDate, 15, yPos);
        
        // Wrap event name if too long
        const eventName = event.name.length > 40 ? event.name.substring(0, 37) + '...' : event.name;
        pdf.text(eventName, 50, yPos);
        pdf.text(event.type, 130, yPos);
        
        pdf.setTextColor(0, 0, 0);
        
        if (event.description) {
            yPos += 4;
            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            const desc = event.description.length > 60 ? event.description.substring(0, 57) + '...' : event.description;
            pdf.text(desc, 50, yPos);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(9);
        }
        
        yPos += 6;
    });
    
    // Footer
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
        pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 195, 290, { align: 'right' });
    }
    
    // Save the PDF
    pdf.save(`School_Calendar_${selectedSemester}.pdf`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calendar page loaded');
    
    // Initialize default events if none exist
    const existingEvents = loadFromLocalStorage('calendarEvents');
    if (!existingEvents || existingEvents.length === 0) {
        saveToLocalStorage('calendarEvents', getDefaultCalendarEvents());
    }
    
    renderYearCalendar();
    renderCalendarEvents();
    
    // Semester change handler
    document.getElementById('semesterSelect').addEventListener('change', function() {
        renderYearCalendar();
        renderCalendarEvents();
    });
    
    // Save event button handler
    const saveBtn = document.getElementById('saveEventBtn');
    console.log('Save button found:', saveBtn);
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            console.log('Save button clicked');
            e.preventDefault();
            addEvent();
        });
    } else {
        console.error('Save button not found!');
    }
});
