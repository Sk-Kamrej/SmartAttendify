# Entity Identification

## Purpose

This document identifies all the major entities required for the SmartAttendify database. These entities are derived from the Software Requirements Specification (SRS), Business Rules, Use Cases, and System Design documents.

---

# Core Entities

## 1. User

Represents every authenticated user in the system.

Examples:

- Student
- Teacher
- HOD
- Principal

---

## 2. Role

Defines the permissions assigned to a user.

Examples:

- Student
- Teacher
- HOD
- Principal

---

## 3. Student

Stores student-specific information.

Examples:

- Student ID
- Enrollment Number
- Semester
- Program

---

## 4. Teacher

Stores teacher-specific information.

---

## 5. Department

Represents academic departments.

Example:

- Computer Applications
- Geography
- Political Science

---

## 6. Program

Represents academic programs.

Examples:

- BCA
- B.Sc
- BA

---

## 7. Academic Session

Represents an academic year.

Examples:

- 2025–2026
- 2026–2027

---

## 8. Semester

Represents semesters within a program.

Examples:

- Semester I
- Semester II
- Semester III

---

## 9. Section

Represents class sections.

Examples:

- A
- B
- C

Section support is optional because some colleges do not use sections.

---

## 10. Subject

Represents academic subjects.

Examples:

- Database Management System
- Operating System
- Compiler Design

---

## 11. Class Assignment

Defines which teacher teaches which subject for a specific program, semester, section, and academic session.

---

## 12. Attendance

Stores daily attendance records.

---

## 13. Attendance Status

Stores configurable attendance statuses.

Examples:

- Present
- Absent
- Medical Leave
- On Duty
- Sports Duty

---

## 14. Attendance Policy

Stores attendance rules.

Examples:

- Minimum Attendance
- Warning Threshold
- Edit Window

---

## 15. Report Template

Stores saved report layouts and templates.

---

## 16. Audit Log

Stores important system activities.

Examples:

- Attendance Edited
- Policy Changed
- Semester Promotion

---

## 17. Notification

Stores system-generated notifications.

Examples:

- Low Attendance Warning
- Policy Update
- Semester Promotion

---

## 18. Semester Promotion

Stores semester promotion history.

---

# Entity Summary

| Entity | Purpose |
|---------|---------|
| User | Authentication |
| Role | Authorization |
| Student | Student Information |
| Teacher | Teacher Information |
| Department | Academic Department |
| Program | Academic Program |
| Academic Session | Academic Year |
| Semester | Semester Details |
| Section | Class Sections |
| Subject | Subjects |
| Class Assignment | Teaching Allocation |
| Attendance | Attendance Records |
| Attendance Status | Attendance Types |
| Attendance Policy | Attendance Rules |
| Report Template | Saved Reports |
| Audit Log | System History |
| Notification | User Notifications |
| Semester Promotion | Promotion History |

---

## Design Decisions

- Authentication is separated from academic data.
- Attendance statuses are configurable.
- Student IDs never change.
- Academic sessions are stored independently.
- All important actions are audited.

---

## Future Entities

Future versions may introduce:

- College
- Campus
- Timetable
- Examination
- Marks
- Result
- Parent
- Fee
- QR Attendance
- Face Recognition Attendance
