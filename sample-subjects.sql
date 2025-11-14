-- Sample Subjects for ALL Courses
-- Note: Adjust course_id values (1-11) based on your actual course IDs in the database
-- Course mapping: 1=CS, 2=IT, 3=BA, 4=CE, 5=ME, 6=EE, 7=Accountancy, 8=Psychology, 9=Education, 10=Marketing, 11=Architecture

-- ==============================================================================
-- COMPUTER SCIENCE (course_id = 1)
-- ==============================================================================

-- Computer Science - 1st Year, 1st Semester
INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
('CS101', 'Introduction to Computing', 'Fundamentals of computer systems and programming', 3, 1, '1st Year', '1st Semester'),
('MATH101', 'College Algebra', 'Basic algebraic concepts and functions', 3, 1, '1st Year', '1st Semester'),
('ENG101', 'English Communication 1', 'Reading, writing, and oral communication skills', 3, 1, '1st Year', '1st Semester'),
('PE101', 'Physical Education 1', 'Physical fitness and wellness', 2, 1, '1st Year', '1st Semester'),
('NSTP101', 'National Service Training Program 1', 'Civic welfare and defense preparedness', 3, 1, '1st Year', '1st Semester'),
('CS102', 'Computer Programming 1', 'Introduction to programming using Python', 3, 1, '1st Year', '1st Semester'),
('SCI101', 'General Physics', 'Basic principles of physics', 4, 1, '1st Year', '1st Semester');

-- Computer Science - 1st Year, 2nd Semester
INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
('CS103', 'Computer Programming 2', 'Object-oriented programming concepts', 3, 1, '1st Year', '2nd Semester'),
('MATH102', 'Trigonometry', 'Trigonometric functions and applications', 3, 1, '1st Year', '2nd Semester'),
('ENG102', 'English Communication 2', 'Academic writing and research', 3, 1, '1st Year', '2nd Semester'),
('PE102', 'Physical Education 2', 'Sports and recreational activities', 2, 1, '1st Year', '2nd Semester'),
('NSTP102', 'National Service Training Program 2', 'Community service and leadership', 3, 1, '1st Year', '2nd Semester'),
('CS104', 'Discrete Mathematics', 'Logic, sets, and combinatorics', 3, 1, '1st Year', '2nd Semester'),
('SCI102', 'General Chemistry', 'Basic chemical principles', 4, 1, '1st Year', '2nd Semester');

-- Computer Science - 2nd Year, 1st Semester
INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
('CS201', 'Data Structures and Algorithms', 'Advanced data structures and algorithm design', 3, 1, '2nd Year', '1st Semester'),
('CS202', 'Web Development 1', 'HTML, CSS, and JavaScript fundamentals', 3, 1, '2nd Year', '1st Semester'),
('MATH201', 'Calculus 1', 'Differential calculus', 4, 1, '2nd Year', '1st Semester'),
('PE201', 'Physical Education 3', 'Team sports and fitness', 2, 1, '2nd Year', '1st Semester'),
('CS203', 'Digital Logic Design', 'Boolean algebra and logic circuits', 3, 1, '2nd Year', '1st Semester'),
('HUM101', 'Philippine History', 'Philippine historical development', 3, 1, '2nd Year', '1st Semester');

-- Sections for CS101 - Introduction to Computing
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'CS101' LIMIT 1), 'CS101-A', 'MWF 8:00-9:00 AM', 'Room 301', 'Prof. Maria Santos', 35, 0),
((SELECT id FROM subjects WHERE code = 'CS101' LIMIT 1), 'CS101-B', 'TTH 10:00-11:30 AM', 'Room 301', 'Prof. Juan Cruz', 35, 0),
((SELECT id FROM subjects WHERE code = 'CS101' LIMIT 1), 'CS101-C', 'MWF 1:00-2:00 PM', 'Room 302', 'Prof. Maria Santos', 35, 0);

-- Sections for CS102 - Computer Programming 1
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'CS102' LIMIT 1), 'CS102-A', 'MWF 9:00-10:00 AM', 'Lab 101', 'Prof. Pedro Reyes', 30, 0),
((SELECT id FROM subjects WHERE code = 'CS102' LIMIT 1), 'CS102-B', 'TTH 1:00-2:30 PM', 'Lab 102', 'Prof. Ana Garcia', 30, 0);

-- Sections for MATH101 - College Algebra
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'MATH101' LIMIT 1), 'MATH101-A', 'MWF 10:00-11:00 AM', 'Room 201', 'Prof. Carlos Diaz', 40, 0),
((SELECT id FROM subjects WHERE code = 'MATH101' LIMIT 1), 'MATH101-B', 'TTH 8:00-9:30 AM', 'Room 202', 'Prof. Linda Ramos', 40, 0);

-- Sections for ENG101 - English Communication 1
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'ENG101' LIMIT 1), 'ENG101-A', 'MWF 11:00-12:00 PM', 'Room 105', 'Prof. Rosa Martinez', 35, 0),
((SELECT id FROM subjects WHERE code = 'ENG101' LIMIT 1), 'ENG101-B', 'TTH 2:30-4:00 PM', 'Room 106', 'Prof. Jose Fernandez', 35, 0);

-- Sections for PE101 - Physical Education 1
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'PE101' LIMIT 1), 'PE101-A', 'TTH 7:00-8:30 AM', 'Gymnasium', 'Coach Roberto Silva', 50, 0),
((SELECT id FROM subjects WHERE code = 'PE101' LIMIT 1), 'PE101-B', 'MWF 4:00-5:00 PM', 'Gymnasium', 'Coach Elena Torres', 50, 0);

-- Sections for NSTP101
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'NSTP101' LIMIT 1), 'NSTP101-A', 'SAT 8:00-11:00 AM', 'Room 401', 'Ms. Carmen Lopez', 40, 0);

-- Sections for SCI101 - General Physics
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'SCI101' LIMIT 1), 'SCI101-A', 'TTH 8:30-10:30 AM', 'Lab 201', 'Prof. Ricardo Aquino', 30, 0),
((SELECT id FROM subjects WHERE code = 'SCI101' LIMIT 1), 'SCI101-B', 'MWF 2:00-4:00 PM', 'Lab 202', 'Prof. Sophia Cruz', 30, 0);

-- Add prerequisites (CS102 requires CS101)
INSERT INTO prerequisites (subject_id, prerequisite_subject_id) VALUES
((SELECT id FROM subjects WHERE code = 'CS102' LIMIT 1), (SELECT id FROM subjects WHERE code = 'CS101' LIMIT 1));

-- Add prerequisites (CS103 requires CS102)
INSERT INTO prerequisites (subject_id, prerequisite_subject_id) VALUES
((SELECT id FROM subjects WHERE code = 'CS103' LIMIT 1), (SELECT id FROM subjects WHERE code = 'CS102' LIMIT 1));

-- Add prerequisites (CS201 requires CS103)
INSERT INTO prerequisites (subject_id, prerequisite_subject_id) VALUES
((SELECT id FROM subjects WHERE code = 'CS201' LIMIT 1), (SELECT id FROM subjects WHERE code = 'CS103' LIMIT 1));
