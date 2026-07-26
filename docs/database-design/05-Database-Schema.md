# Database Schema

## Purpose

This document defines the physical database schema for SmartAttendify. It describes the database tables, primary keys, foreign keys, constraints, and naming conventions that will be implemented in PostgreSQL.

---

# Database Information

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| ORM | Prisma |
| Primary Key Type | UUID |
| Character Set | UTF-8 |
| Time Zone | UTC |

---

# Naming Conventions

## Tables

- Singular names
- snake_case

Examples:

- user
- student
- attendance
- class_assignment

---

## Columns

Use snake_case.

Examples:

- student_id
- created_at
- attendance_date

---

## Primary Keys

Every table contains:

id UUID PRIMARY KEY

---

## Foreign Keys

Foreign keys follow:

entity_id

Examples:

department_id

teacher_id

subject_id

---

# Tables

---

## role

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| role_name | VARCHAR(30) | UNIQUE NOT NULL |
| description | TEXT | NULL |

---

## user

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| username | VARCHAR(50) | UNIQUE NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| role_id | UUID | FK |
| is_active | BOOLEAN | DEFAULT TRUE |
| last_login | TIMESTAMP | NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

---

## department

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| department_name | VARCHAR(100) | UNIQUE |
| code | VARCHAR(20) | UNIQUE |

---

## program

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| department_id | UUID | FK |
| program_name | VARCHAR(100) | NOT NULL |
| duration | INTEGER | NOT NULL |

---

## academic_session

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| session_name | VARCHAR(20) | UNIQUE |
| start_date | DATE | NOT NULL |
| end_date | DATE | NOT NULL |

---

## semester

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| program_id | UUID | FK |
| semester_number | INTEGER | NOT NULL |

---

## section

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| section_name | VARCHAR(10) | NOT NULL |

---

## teacher

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| user_id | UUID | FK UNIQUE |
| teacher_id | VARCHAR(30) | UNIQUE |
| department_id | UUID | FK |
| designation | VARCHAR(50) | NOT NULL |

---

## student

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| user_id | UUID | FK UNIQUE |
| student_id | VARCHAR(30) | UNIQUE |
| department_id | UUID | FK |
| program_id | UUID | FK |
| semester_id | UUID | FK |
| section_id | UUID | FK NULL |
| academic_session_id | UUID | FK |
| admission_date | DATE | NOT NULL |
| status | VARCHAR(20) | DEFAULT 'Active' |

---

## subject

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| subject_code | VARCHAR(20) | UNIQUE |
| subject_name | VARCHAR(150) | NOT NULL |
| credits | INTEGER | NOT NULL |
| semester_id | UUID | FK |

---

## class_assignment

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| teacher_id | UUID | FK |
| subject_id | UUID | FK |
| program_id | UUID | FK |
| semester_id | UUID | FK |
| section_id | UUID | FK NULL |
| academic_session_id | UUID | FK |

---

## attendance_status

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| status_name | VARCHAR(30) | UNIQUE |
| short_code | VARCHAR(5) | UNIQUE |
| counts_as_present | BOOLEAN | DEFAULT TRUE |

---

## attendance_policy

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| minimum_percentage | DECIMAL(5,2) | NOT NULL |
| warning_percentage | DECIMAL(5,2) | NOT NULL |
| critical_percentage | DECIMAL(5,2) | NOT NULL |
| edit_window_hours | INTEGER | NOT NULL |

---

## attendance

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| student_id | UUID | FK |
| class_assignment_id | UUID | FK |
| attendance_status_id | UUID | FK |
| attendance_date | DATE | NOT NULL |
| remarks | TEXT | NULL |
| marked_by | UUID | FK |
| created_at | TIMESTAMP | DEFAULT NOW() |

---

## report_template

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| template_name | VARCHAR(100) | NOT NULL |
| created_by | UUID | FK |
| layout | JSONB | NOT NULL |

---

## audit_log

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| user_id | UUID | FK |
| action | VARCHAR(100) | NOT NULL |
| entity_name | VARCHAR(100) | NOT NULL |
| entity_id | UUID | NOT NULL |
| timestamp | TIMESTAMP | DEFAULT NOW() |

---

## notification

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| user_id | UUID | FK |
| title | VARCHAR(150) | NOT NULL |
| message | TEXT | NOT NULL |
| is_read | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT NOW() |

---

## semester_promotion

| Column | Type | Constraint |
|---------|------|------------|
| id | UUID | PK |
| student_id | UUID | FK |
| previous_semester_id | UUID | FK |
| new_semester_id | UUID | FK |
| promoted_by | UUID | FK |
| promotion_date | DATE | NOT NULL |
| remarks | TEXT | NULL |

---

# Common Constraints

- UUID is used as the primary key for all tables.
- Foreign keys enforce referential integrity.
- Frequently searched fields use UNIQUE where appropriate.
- Timestamps are stored in UTC.
- Nullable fields are kept to a minimum.

---

# Recommended Indexes

| Table | Columns |
|---------|---------|
| user | username |
| student | student_id |
| teacher | teacher_id |
| attendance | student_id, attendance_date |
| attendance | class_assignment_id |
| class_assignment | teacher_id |
| class_assignment | subject_id |
| notification | user_id |
| audit_log | user_id |
| semester_promotion | student_id |

---

# Future Enhancements

Future versions may include:

- Soft delete (`deleted_at`)
- Row versioning for optimistic locking
- Full-text search
- Table partitioning for attendance records
- Multi-college support