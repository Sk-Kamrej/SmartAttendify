# Entity Relationship Diagram (ERD)

## Purpose

This document presents the Entity Relationship Diagram (ERD) for the SmartAttendify system. It illustrates the entities, their attributes (simplified), and the relationships between them. The ERD serves as the foundation for the PostgreSQL database schema, Prisma models, and backend API development.

---

# Scope

The ERD includes:

- Authentication
- User Management
- Academic Structure
- Attendance Management
- Attendance Policy
- Report Templates
- Notifications
- Audit Logs
- Semester Promotion

---

# Mermaid ER Diagram

```mermaid
erDiagram

ROLE ||--o{ USER : assigns

USER ||--|| STUDENT : has
USER ||--|| TEACHER : has

DEPARTMENT ||--o{ TEACHER : employs
DEPARTMENT ||--o{ PROGRAM : offers

PROGRAM ||--o{ SEMESTER : contains
PROGRAM ||--o{ STUDENT : enrolls

ACADEMIC_SESSION ||--o{ STUDENT : admits

SEMESTER ||--o{ STUDENT : studies_in
SEMESTER ||--o{ SUBJECT : contains

SECTION ||--o{ STUDENT : groups

TEACHER ||--o{ CLASS_ASSIGNMENT : teaches
SUBJECT ||--o{ CLASS_ASSIGNMENT : assigned_to
PROGRAM ||--o{ CLASS_ASSIGNMENT : includes
SEMESTER ||--o{ CLASS_ASSIGNMENT : scheduled_for
SECTION ||--o{ CLASS_ASSIGNMENT : organized_for
ACADEMIC_SESSION ||--o{ CLASS_ASSIGNMENT : offered_in

STUDENT ||--o{ ATTENDANCE : has
CLASS_ASSIGNMENT ||--o{ ATTENDANCE : records
ATTENDANCE_STATUS ||--o{ ATTENDANCE : categorizes

USER ||--o{ REPORT_TEMPLATE : creates

USER ||--o{ AUDIT_LOG : performs

USER ||--o{ NOTIFICATION : receives

STUDENT ||--o{ SEMESTER_PROMOTION : promoted
USER ||--o{ SEMESTER_PROMOTION : approves

ATTENDANCE_POLICY ||--o{ ATTENDANCE : validates
```

---

# Entity Descriptions

## Authentication

- Role
- User

---

## Academic Structure

- Department
- Program
- Academic Session
- Semester
- Section
- Subject

---

## Academic Operations

- Student
- Teacher
- Class Assignment
- Attendance
- Attendance Status
- Attendance Policy

---

## Reporting

- Report Template

---

## System

- Notification
- Audit Log

---

## Academic Administration

- Semester Promotion

---

# Design Decisions

## Authentication

Authentication is separated from profile information.

User stores login credentials.

Student and Teacher store profile information.

---

## Attendance

Attendance is linked to Class Assignment instead of directly to Teacher or Subject.

This allows:

- Better normalization
- Easier timetable integration
- Future online attendance

---

## Promotion

Student IDs remain unchanged after semester promotion.

Promotion history is stored separately.

---

## Attendance Status

Attendance statuses are configurable.

Examples:

- Present
- Absent
- Leave
- Medical Leave
- Sports Duty

---

## Notifications

Notifications are stored for every user.

Future versions may support:

- Push Notifications
- Email Notifications

---

## Future Enhancements

Future versions may introduce:

- College
- Campus
- Parent
- Timetable
- Examination
- Marks
- Result
- Fee Management
- QR Attendance
- Face Recognition
- AI Attendance Analytics
