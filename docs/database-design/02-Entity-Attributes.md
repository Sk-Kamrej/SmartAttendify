# Entity Attributes

## Purpose

This document defines the attributes (fields), primary keys, and important constraints for every entity in the SmartAttendify system. These definitions serve as the foundation for the Entity Relationship Diagram (ERD), PostgreSQL database schema, and Prisma models.

---

# 1. User

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| username | VARCHAR(50) | Unique login username |
| password_hash | VARCHAR(255) | Encrypted password |
| role_id | UUID | References Role |
| is_active | BOOLEAN | Account status |
| last_login | TIMESTAMP | Last successful login |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

---

# 2. Role

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| role_name | VARCHAR(30) | Student, Teacher, HOD, Principal |
| description | TEXT | Role description |

---

# 3. Student

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| user_id | UUID | References User |
| student_id | VARCHAR(30) | College Student ID |
| first_name | VARCHAR(50) | First Name |
| last_name | VARCHAR(50) | Last Name |
| email | VARCHAR(100) | Email |
| phone | VARCHAR(20) | Phone Number |
| department_id | UUID | References Department |
| program_id | UUID | References Program |
| semester_id | UUID | References Semester |
| section_id | UUID | References Section (Nullable) |
| academic_session_id | UUID | References Academic Session |
| admission_date | DATE | Admission Date |
| status | VARCHAR(20) | Active / Graduated / Suspended |

---

# 4. Teacher

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| user_id | UUID | References User |
| teacher_id | VARCHAR(30) | Employee ID |
| first_name | VARCHAR(50) | First Name |
| last_name | VARCHAR(50) | Last Name |
| email | VARCHAR(100) | Email |
| phone | VARCHAR(20) | Contact Number |
| department_id | UUID | References Department |
| designation | VARCHAR(50) | Assistant Professor, HOD, etc. |

---

# 5. Department

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| department_name | VARCHAR(100) | Department Name |
| code | VARCHAR(20) | Department Code |

---

# 6. Program

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| department_id | UUID | References Department |
| program_name | VARCHAR(100) | Program Name |
| duration | INTEGER | Number of semesters |

---

# 7. Academic Session

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| session_name | VARCHAR(20) | Example: 2026–2027 |
| start_date | DATE | Session Start |
| end_date | DATE | Session End |

---

# 8. Semester

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| semester_number | INTEGER | 1–8 |
| semester_name | VARCHAR(30) | Semester I, II, etc. |

---

# 9. Section

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| section_name | VARCHAR(10) | A, B, C |
| description | TEXT | Optional description |

---

# 10. Subject

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| subject_code | VARCHAR(20) | Subject Code |
| subject_name | VARCHAR(150) | Subject Name |
| credits | INTEGER | Credit Value |
| semester_id | UUID | References Semester |

---

# 11. Class Assignment

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| teacher_id | UUID | References Teacher |
| subject_id | UUID | References Subject |
| program_id | UUID | References Program |
| semester_id | UUID | References Semester |
| section_id | UUID | References Section |
| academic_session_id | UUID | References Academic Session |

---

# 12. Attendance

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| student_id | UUID | References Student |
| class_assignment_id | UUID | References Class Assignment |
| attendance_status_id | UUID | References Attendance Status |
| attendance_date | DATE | Attendance Date |
| remarks | TEXT | Optional remarks |
| marked_by | UUID | References Teacher |
| created_at | TIMESTAMP | Record creation |

---

# 13. Attendance Status

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| status_name | VARCHAR(30) | Present, Absent, etc. |
| short_code | VARCHAR(5) | P, A, ML |
| counts_as_present | BOOLEAN | Attendance calculation |

---

# 14. Attendance Policy

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| minimum_percentage | DECIMAL(5,2) | Required attendance |
| warning_percentage | DECIMAL(5,2) | Warning threshold |
| critical_percentage | DECIMAL(5,2) | Critical threshold |
| edit_window_hours | INTEGER | Edit duration |

---

# 15. Report Template

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| template_name | VARCHAR(100) | Template Name |
| created_by | UUID | References User |
| layout | JSON | Report layout configuration |

---

# 16. Audit Log

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| user_id | UUID | References User |
| action | VARCHAR(100) | Activity performed |
| entity_name | VARCHAR(100) | Affected entity |
| entity_id | UUID | Entity identifier |
| timestamp | TIMESTAMP | Action time |

---

# 17. Notification

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| user_id | UUID | References User |
| title | VARCHAR(150) | Notification title |
| message | TEXT | Notification content |
| is_read | BOOLEAN | Read status |
| created_at | TIMESTAMP | Creation time |

---

# 18. Semester Promotion

| Attribute | Type | Description |
|------------|------|-------------|
| id | UUID | Primary Key |
| student_id | UUID | References Student |
| previous_semester_id | UUID | References Semester |
| new_semester_id | UUID | References Semester |
| promoted_by | UUID | References User |
| promotion_date | DATE | Promotion date |
| remarks | TEXT | Optional remarks |

---

## Common Conventions

- Primary keys use UUID.
- Foreign keys reference related entities.
- Passwords are stored as hashes.
- Timestamps use UTC.
- Soft delete can be added in future versions if required.