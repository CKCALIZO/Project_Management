-- Complete Subject Data for ALL Courses
-- Course IDs: 1=CS, 2=IT, 3=BA, 4=CE, 5=ME, 6=EE, 7=Accountancy, 8=Psychology, 9=Education, 10=Marketing, 11=Architecture

-- ==============================================================================
-- 1. COMPUTER SCIENCE (course_id = 1)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (21 units)
('CS101', 'Introduction to Computing', 'Fundamentals of computer systems', 3, 1, '1st Year', '1st Semester'),
('CS102', 'Computer Programming 1', 'Programming using Python', 3, 1, '1st Year', '1st Semester'),
('MATH101', 'College Algebra', 'Algebraic concepts', 3, 1, '1st Year', '1st Semester'),
('ENG101', 'English Communication 1', 'Communication skills', 3, 1, '1st Year', '1st Semester'),
('PE101', 'Physical Education 1', 'Physical fitness', 2, 1, '1st Year', '1st Semester'),
('NSTP101', 'NSTP 1', 'Civic welfare', 3, 1, '1st Year', '1st Semester'),
('PHY101', 'Physics for CS', 'Basic physics', 4, 1, '1st Year', '1st Semester');

-- ==============================================================================
-- 2. INFORMATION TECHNOLOGY (course_id = 2)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (21 units)
('IT101', 'Introduction to IT', 'IT fundamentals', 3, 2, '1st Year', '1st Semester'),
('IT102', 'Programming Fundamentals', 'Intro to programming', 3, 2, '1st Year', '1st Semester'),
('MATH101-IT', 'College Algebra', 'Algebraic concepts', 3, 2, '1st Year', '1st Semester'),
('ENG101-IT', 'English Communication 1', 'Communication skills', 3, 2, '1st Year', '1st Semester'),
('PE101-IT', 'Physical Education 1', 'Physical fitness', 2, 2, '1st Year', '1st Semester'),
('NSTP101-IT', 'NSTP 1', 'Civic welfare', 3, 2, '1st Year', '1st Semester'),
('IT103', 'Computer Hardware', 'Hardware fundamentals', 4, 2, '1st Year', '1st Semester');

-- ==============================================================================
-- 3. BUSINESS ADMINISTRATION (course_id = 3)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (20 units)
('BA101', 'Introduction to Business', 'Business fundamentals', 3, 3, '1st Year', '1st Semester'),
('BA102', 'Business Mathematics', 'Quantitative methods', 3, 3, '1st Year', '1st Semester'),
('ECON101', 'Microeconomics', 'Economic principles', 3, 3, '1st Year', '1st Semester'),
('ENG101-BA', 'English Communication 1', 'Communication skills', 3, 3, '1st Year', '1st Semester'),
('PE101-BA', 'Physical Education 1', 'Physical fitness', 2, 3, '1st Year', '1st Semester'),
('NSTP101-BA', 'NSTP 1', 'Civic welfare', 3, 3, '1st Year', '1st Semester'),
('BA103', 'Principles of Management', 'Management basics', 3, 3, '1st Year', '1st Semester');

-- ==============================================================================
-- 4. CIVIL ENGINEERING (course_id = 4)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (22 units)
('CE101', 'Engineering Drawing', 'Technical drawing', 3, 4, '1st Year', '1st Semester'),
('MATH101-CE', 'College Algebra', 'Advanced algebra', 3, 4, '1st Year', '1st Semester'),
('CHEM101', 'General Chemistry', 'Chemistry principles', 4, 4, '1st Year', '1st Semester'),
('PHY101-CE', 'Physics 1', 'Mechanics', 4, 4, '1st Year', '1st Semester'),
('ENG101-CE', 'English Communication 1', 'Communication skills', 3, 4, '1st Year', '1st Semester'),
('PE101-CE', 'Physical Education 1', 'Physical fitness', 2, 4, '1st Year', '1st Semester'),
('NSTP101-CE', 'NSTP 1', 'Civic welfare', 3, 4, '1st Year', '1st Semester');

-- ==============================================================================
-- 5. MECHANICAL ENGINEERING (course_id = 5)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (22 units)
('ME101', 'Engineering Graphics', 'Technical drawings', 3, 5, '1st Year', '1st Semester'),
('MATH101-ME', 'College Algebra', 'Advanced algebra', 3, 5, '1st Year', '1st Semester'),
('CHEM101-ME', 'General Chemistry', 'Chemistry principles', 4, 5, '1st Year', '1st Semester'),
('PHY101-ME', 'Physics 1', 'Mechanics', 4, 5, '1st Year', '1st Semester'),
('ENG101-ME', 'English Communication 1', 'Communication skills', 3, 5, '1st Year', '1st Semester'),
('PE101-ME', 'Physical Education 1', 'Physical fitness', 2, 5, '1st Year', '1st Semester'),
('NSTP101-ME', 'NSTP 1', 'Civic welfare', 3, 5, '1st Year', '1st Semester');

-- ==============================================================================
-- 6. ELECTRICAL ENGINEERING (course_id = 6)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (22 units)
('EE101', 'Basic Electronics', 'Electronic fundamentals', 3, 6, '1st Year', '1st Semester'),
('MATH101-EE', 'College Algebra', 'Advanced algebra', 3, 6, '1st Year', '1st Semester'),
('CHEM101-EE', 'General Chemistry', 'Chemistry principles', 4, 6, '1st Year', '1st Semester'),
('PHY101-EE', 'Physics 1', 'Electricity and magnetism', 4, 6, '1st Year', '1st Semester'),
('ENG101-EE', 'English Communication 1', 'Communication skills', 3, 6, '1st Year', '1st Semester'),
('PE101-EE', 'Physical Education 1', 'Physical fitness', 2, 6, '1st Year', '1st Semester'),
('NSTP101-EE', 'NSTP 1', 'Civic welfare', 3, 6, '1st Year', '1st Semester');

-- ==============================================================================
-- 7. ACCOUNTANCY (course_id = 7)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (20 units)
('ACC101', 'Fundamentals of Accounting', 'Basic accounting principles', 3, 7, '1st Year', '1st Semester'),
('ACC102', 'Financial Accounting 1', 'Financial statements', 3, 7, '1st Year', '1st Semester'),
('BA102-ACC', 'Business Mathematics', 'Quantitative methods', 3, 7, '1st Year', '1st Semester'),
('ECON101-ACC', 'Microeconomics', 'Economic principles', 3, 7, '1st Year', '1st Semester'),
('ENG101-ACC', 'English Communication 1', 'Communication skills', 3, 7, '1st Year', '1st Semester'),
('PE101-ACC', 'Physical Education 1', 'Physical fitness', 2, 7, '1st Year', '1st Semester'),
('NSTP101-ACC', 'NSTP 1', 'Civic welfare', 3, 7, '1st Year', '1st Semester');

-- ==============================================================================
-- 8. PSYCHOLOGY (course_id = 8)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (20 units)
('PSY101', 'Introduction to Psychology', 'Basic psychological concepts', 3, 8, '1st Year', '1st Semester'),
('PSY102', 'Developmental Psychology', 'Human development', 3, 8, '1st Year', '1st Semester'),
('BIO101', 'General Biology', 'Biological systems', 3, 8, '1st Year', '1st Semester'),
('SOC101', 'Introduction to Sociology', 'Social behavior', 3, 8, '1st Year', '1st Semester'),
('ENG101-PSY', 'English Communication 1', 'Communication skills', 3, 8, '1st Year', '1st Semester'),
('PE101-PSY', 'Physical Education 1', 'Physical fitness', 2, 8, '1st Year', '1st Semester'),
('NSTP101-PSY', 'NSTP 1', 'Civic welfare', 3, 8, '1st Year', '1st Semester');

-- ==============================================================================
-- 9. EDUCATION (course_id = 9)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (20 units)
('EDU101', 'Introduction to Teaching', 'Teaching profession', 3, 9, '1st Year', '1st Semester'),
('EDU102', 'Child and Adolescent Development', 'Growth and development', 3, 9, '1st Year', '1st Semester'),
('MATH101-EDU', 'College Algebra', 'Mathematics for teachers', 3, 9, '1st Year', '1st Semester'),
('FIL101', 'Filipino 1', 'Filipino language', 3, 9, '1st Year', '1st Semester'),
('ENG101-EDU', 'English Communication 1', 'Communication skills', 3, 9, '1st Year', '1st Semester'),
('PE101-EDU', 'Physical Education 1', 'Physical fitness', 2, 9, '1st Year', '1st Semester'),
('NSTP101-EDU', 'NSTP 1', 'Civic welfare', 3, 9, '1st Year', '1st Semester');

-- ==============================================================================
-- 10. MARKETING (course_id = 10)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (20 units)
('MKT101', 'Principles of Marketing', 'Marketing fundamentals', 3, 10, '1st Year', '1st Semester'),
('BA101-MKT', 'Introduction to Business', 'Business basics', 3, 10, '1st Year', '1st Semester'),
('BA102-MKT', 'Business Mathematics', 'Quantitative methods', 3, 10, '1st Year', '1st Semester'),
('ECON101-MKT', 'Microeconomics', 'Economic principles', 3, 10, '1st Year', '1st Semester'),
('ENG101-MKT', 'English Communication 1', 'Communication skills', 3, 10, '1st Year', '1st Semester'),
('PE101-MKT', 'Physical Education 1', 'Physical fitness', 2, 10, '1st Year', '1st Semester'),
('NSTP101-MKT', 'NSTP 1', 'Civic welfare', 3, 10, '1st Year', '1st Semester');

-- ==============================================================================
-- 11. ARCHITECTURE (course_id = 11)
-- ==============================================================================

INSERT INTO subjects (code, name, description, units, course_id, year_level, semester) VALUES
-- 1st Year, 1st Semester (25 units)
('ARC101', 'Architectural Design 1', 'Basic design principles', 4, 11, '1st Year', '1st Semester'),
('ARC102', 'Architectural Drawing', 'Technical drawing', 3, 11, '1st Year', '1st Semester'),
('MATH101-ARC', 'College Algebra', 'Mathematics', 3, 11, '1st Year', '1st Semester'),
('PHY101-ARC', 'Physics 1', 'Mechanics', 4, 11, '1st Year', '1st Semester'),
('HIS101', 'History of Architecture', 'Architectural history', 3, 11, '1st Year', '1st Semester'),
('ENG101-ARC', 'English Communication 1', 'Communication skills', 3, 11, '1st Year', '1st Semester'),
('PE101-ARC', 'Physical Education 1', 'Physical fitness', 2, 11, '1st Year', '1st Semester'),
('NSTP101-ARC', 'NSTP 1', 'Civic welfare', 3, 11, '1st Year', '1st Semester');

-- ==============================================================================
-- SECTIONS FOR ALL SUBJECTS
-- ==============================================================================

-- Sections for common subjects
-- ENG101 Sections (each course has its own)
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'ENG101' LIMIT 1), 'ENG101-A', 'MWF 8:00-9:00 AM', 'Room 101', 'Prof. Ana Cruz', 35, 0),
((SELECT id FROM subjects WHERE code = 'ENG101' LIMIT 1), 'ENG101-B', 'TTH 10:00-11:30 AM', 'Room 101', 'Prof. Jose Santos', 35, 0),
((SELECT id FROM subjects WHERE code = 'ENG101-IT' LIMIT 1), 'ENG101-C', 'MWF 1:00-2:00 PM', 'Room 102', 'Prof. Ana Cruz', 35, 0),
((SELECT id FROM subjects WHERE code = 'ENG101-BA' LIMIT 1), 'ENG101-D', 'TTH 1:00-2:30 PM', 'Room 102', 'Prof. Maria Reyes', 35, 0);

-- MATH101 Sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'MATH101' LIMIT 1), 'MATH101-A', 'MWF 9:00-10:00 AM', 'Room 201', 'Prof. Carlos Diaz', 40, 0),
((SELECT id FROM subjects WHERE code = 'MATH101-IT' LIMIT 1), 'MATH101-B', 'TTH 8:00-9:30 AM', 'Room 201', 'Prof. Linda Garcia', 40, 0),
((SELECT id FROM subjects WHERE code = 'MATH101-CE' LIMIT 1), 'MATH101-C', 'MWF 2:00-3:00 PM', 'Room 202', 'Prof. Ricardo Fernandez', 40, 0);

-- PE101 Sections (each course needs sections)
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'PE101' LIMIT 1), 'PE101-A', 'TTH 7:00-8:30 AM', 'Gymnasium', 'Coach Roberto Silva', 50, 0),
((SELECT id FROM subjects WHERE code = 'PE101' LIMIT 1), 'PE101-B', 'MWF 4:00-5:00 PM', 'Gymnasium', 'Coach Elena Torres', 50, 0);

-- NSTP101 Sections (each course needs sections)
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'NSTP101' LIMIT 1), 'NSTP101-A', 'SAT 8:00-11:00 AM', 'Room 401', 'Ms. Carmen Lopez', 45, 0),
((SELECT id FROM subjects WHERE code = 'NSTP101' LIMIT 1), 'NSTP101-B', 'SAT 1:00-4:00 PM', 'Room 402', 'Mr. Pablo Ramos', 45, 0);

-- Computer Science specific sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'CS101' LIMIT 1), 'CS101-A', 'MWF 10:00-11:00 AM', 'Room 301', 'Prof. Maria Santos', 35, 0),
((SELECT id FROM subjects WHERE code = 'CS101' LIMIT 1), 'CS101-B', 'TTH 2:00-3:30 PM', 'Room 301', 'Prof. Juan Cruz', 35, 0),
((SELECT id FROM subjects WHERE code = 'CS102' LIMIT 1), 'CS102-A', 'MWF 11:00-12:00 PM', 'Lab 101', 'Prof. Pedro Reyes', 30, 0),
((SELECT id FROM subjects WHERE code = 'CS102' LIMIT 1), 'CS102-B', 'TTH 3:30-5:00 PM', 'Lab 102', 'Prof. Ana Garcia', 30, 0);

-- IT specific sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'IT101' LIMIT 1), 'IT101-A', 'MWF 8:00-9:00 AM', 'Room 302', 'Prof. David Lee', 35, 0),
((SELECT id FROM subjects WHERE code = 'IT101' LIMIT 1), 'IT101-B', 'TTH 11:30-1:00 PM', 'Room 302', 'Prof. Sarah Chen', 35, 0),
((SELECT id FROM subjects WHERE code = 'IT102' LIMIT 1), 'IT102-A', 'MWF 1:00-2:00 PM', 'Lab 103', 'Prof. Mike Torres', 30, 0);

-- Business Administration specific sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'BA101' LIMIT 1), 'BA101-A', 'MWF 9:00-10:00 AM', 'Room 401', 'Prof. Gloria Mendez', 40, 0),
((SELECT id FROM subjects WHERE code = 'BA101' LIMIT 1), 'BA101-B', 'TTH 1:00-2:30 PM', 'Room 401', 'Prof. Roberto Tan', 40, 0),
((SELECT id FROM subjects WHERE code = 'BA102' LIMIT 1), 'BA102-A', 'MWF 10:00-11:00 AM', 'Room 402', 'Prof. Emma Rodriguez', 40, 0);

-- Engineering courses (CE, ME, EE) - Physics sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'PHY101-CE' LIMIT 1), 'PHY101-A', 'TTH 8:00-10:00 AM', 'Lab 201', 'Prof. Ricardo Aquino', 30, 0),
((SELECT id FROM subjects WHERE code = 'PHY101-ME' LIMIT 1), 'PHY101-B', 'MWF 9:00-11:00 AM', 'Lab 202', 'Prof. Sophia Cruz', 30, 0),
((SELECT id FROM subjects WHERE code = 'PHY101-EE' LIMIT 1), 'PHY101-C', 'TTH 2:00-4:00 PM', 'Lab 201', 'Prof. Leonardo Silva', 30, 0);

-- Accountancy specific sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'ACC101' LIMIT 1), 'ACC101-A', 'MWF 8:00-9:00 AM', 'Room 501', 'Prof. Patricia Lim', 35, 0),
((SELECT id FROM subjects WHERE code = 'ACC101' LIMIT 1), 'ACC101-B', 'TTH 10:00-11:30 AM', 'Room 501', 'Prof. Benjamin Choi', 35, 0),
((SELECT id FROM subjects WHERE code = 'ACC102' LIMIT 1), 'ACC102-A', 'MWF 11:00-12:00 PM', 'Room 502', 'Prof. Angela Wong', 35, 0);

-- Psychology specific sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'PSY101' LIMIT 1), 'PSY101-A', 'MWF 9:00-10:00 AM', 'Room 601', 'Prof. Diana Reyes', 35, 0),
((SELECT id FROM subjects WHERE code = 'PSY101' LIMIT 1), 'PSY101-B', 'TTH 1:00-2:30 PM', 'Room 601', 'Prof. Marcus Torres', 35, 0),
((SELECT id FROM subjects WHERE code = 'PSY102' LIMIT 1), 'PSY102-A', 'MWF 10:00-11:00 AM', 'Room 602', 'Prof. Sandra Cruz', 35, 0);

-- Education specific sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'EDU101' LIMIT 1), 'EDU101-A', 'MWF 8:00-9:00 AM', 'Room 701', 'Prof. Teresa Garcia', 40, 0),
((SELECT id FROM subjects WHERE code = 'EDU101' LIMIT 1), 'EDU101-B', 'TTH 9:30-11:00 AM', 'Room 701', 'Prof. Ramon Santos', 40, 0),
((SELECT id FROM subjects WHERE code = 'EDU102' LIMIT 1), 'EDU102-A', 'MWF 1:00-2:00 PM', 'Room 702', 'Prof. Luisa Martinez', 40, 0);

-- Marketing specific sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'MKT101' LIMIT 1), 'MKT101-A', 'MWF 9:00-10:00 AM', 'Room 801', 'Prof. Christine Tan', 35, 0),
((SELECT id FROM subjects WHERE code = 'MKT101' LIMIT 1), 'MKT101-B', 'TTH 2:00-3:30 PM', 'Room 801', 'Prof. Miguel Reyes', 35, 0);

-- Architecture specific sections
INSERT INTO sections (subject_id, section_name, schedule, room, instructor, max_students, enrolled_count) VALUES
((SELECT id FROM subjects WHERE code = 'ARC101' LIMIT 1), 'ARC101-A', 'MWF 8:00-10:00 AM', 'Design Studio 1', 'Arch. Victoria Cruz', 25, 0),
((SELECT id FROM subjects WHERE code = 'ARC101' LIMIT 1), 'ARC101-B', 'TTH 1:00-4:00 PM', 'Design Studio 2', 'Arch. Fernando Lopez', 25, 0),
((SELECT id FROM subjects WHERE code = 'ARC102' LIMIT 1), 'ARC102-A', 'MWF 10:00-11:00 AM', 'Drawing Room 1', 'Arch. Isabel Santos', 25, 0);

-- ==============================================================================
-- PREREQUISITES (Sample)
-- ==============================================================================

-- Computer Science prerequisites
INSERT INTO prerequisites (subject_id, prerequisite_subject_id) VALUES
((SELECT id FROM subjects WHERE code = 'CS102' LIMIT 1), (SELECT id FROM subjects WHERE code = 'CS101' LIMIT 1));

-- IT prerequisites
INSERT INTO prerequisites (subject_id, prerequisite_subject_id) VALUES
((SELECT id FROM subjects WHERE code = 'IT102' LIMIT 1), (SELECT id FROM subjects WHERE code = 'IT101' LIMIT 1));

-- Accountancy prerequisites
INSERT INTO prerequisites (subject_id, prerequisite_subject_id) VALUES
((SELECT id FROM subjects WHERE code = 'ACC102' LIMIT 1), (SELECT id FROM subjects WHERE code = 'ACC101' LIMIT 1));
