# Entity Relationships

## Purpose

This document defines the relationships between the entities in the SmartAttendify database. These relationships will be used to create the Entity Relationship Diagram (ERD) and implement the PostgreSQL database schema.

---

# Relationship Types

The following relationship types are used:

- One-to-One (1:1)
- One-to-Many (1:N)
- Many-to-Many (M:N)

---

# 1. Role → User

Relationship:

One Role can be assigned to many Users.

```
Role (1) --------< User (N)
```

Reason:

Many users may share the same role.

Example:

- Student
- Teacher
- HOD
- Principal

---

# 2. User → Student

Relationship:

One User has one Student profile.

```
User (1) -------- Student (1)
```

Reason:

Only users with the Student role have a Student profile.

---

# 3. User → Teacher

Relationship:

One User has one Teacher profile.

```
User (1) -------- Teacher (1)
```

Reason:

Only users with the Teacher or HOD role have a Teacher profile.

---

# 4. Department → Teacher

Relationship:

One Department has many Teachers.

```
Department (1) --------< Teacher (N)
```

---

# 5. Department → Program

Relationship:

One Department offers many Programs.

```
Department (1) --------< Program (N)
```

---

# 6. Program → Semester

Relationship:

One Program contains multiple Semesters.

```
Program (1) --------< Semester (N)
```

---

# 7. Program → Student

Relationship:

One Program has many Students.

```
Program (1) --------< Student (N)
```

---

# 8. Academic Session → Student

Relationship:

One Academic Session includes many Students.

```
Academic Session (1) --------< Student (N)
```

---

# 9. Semester → Student

Relationship:

One Semester has many Students.

```
Semester (1) --------< Student (N)
```

---

# 10. Section → Student

Relationship:

One Section contains many Students.

```
Section (1) --------< Student (N)
```

Section is optional.

---

# 11. Semester → Subject

Relationship:

One Semester contains many Subjects.

```
Semester (1) --------< Subject (N)
```

---

# 12. Teacher → Class Assignment

Relationship:

One Teacher can teach many classes.

```
Teacher (1) --------< Class Assignment (N)
```

---

# 13. Subject → Class Assignment

Relationship:

One Subject may have multiple Class Assignments.

```
Subject (1) --------< Class Assignment (N)
```

---

# 14. Student → Attendance

Relationship:

One Student has many Attendance records.

```
Student (1) --------< Attendance (N)
```

---

# 15. Class Assignment → Attendance

Relationship:

One Class Assignment generates many Attendance records.

```
Class Assignment (1) --------< Attendance (N)
```

---

# 16. Attendance Status → Attendance

Relationship:

One Attendance Status can be used by many Attendance records.

```
Attendance Status (1) --------< Attendance (N)
```

---

# 17. User → Audit Log

Relationship:

One User creates many Audit Log entries.

```
User (1) --------< Audit Log (N)
```

---

# 18. User → Notification

Relationship:

One User receives many Notifications.

```
User (1) --------< Notification (N)
```

---

# 19. Student → Semester Promotion

Relationship:

One Student may have multiple Promotion records.

```
Student (1) --------< Semester Promotion (N)
```

---

# 20. User → Report Template

Relationship:

One User may create multiple Report Templates.

```
User (1) --------< Report Template (N)
```

---

# Many-to-Many Relationships

Some relationships are implemented using junction tables.

---

## Teacher ↔ Subject

A Teacher can teach many Subjects.

A Subject can be taught by many Teachers.

Implemented using:

Class Assignment

```
Teacher
      \
       >---- Class Assignment ----< Subject
```

---

## Student ↔ Subject

A Student studies many Subjects.

A Subject has many Students.

Implemented through:

- Program
- Semester
- Class Assignment
- Attendance

---

# Relationship Summary

| Parent | Child | Type |
|---------|-------|------|
| Role | User | 1:N |
| User | Student | 1:1 |
| User | Teacher | 1:1 |
| Department | Teacher | 1:N |
| Department | Program | 1:N |
| Program | Semester | 1:N |
| Program | Student | 1:N |
| Academic Session | Student | 1:N |
| Semester | Student | 1:N |
| Section | Student | 1:N |
| Semester | Subject | 1:N |
| Teacher | Class Assignment | 1:N |
| Subject | Class Assignment | 1:N |
| Student | Attendance | 1:N |
| Class Assignment | Attendance | 1:N |
| Attendance Status | Attendance | 1:N |
| User | Audit Log | 1:N |
| User | Notification | 1:N |
| Student | Semester Promotion | 1:N |
| User | Report Template | 1:N |

---

## Design Decisions

- Authentication data is separated from profile data.
- Many-to-many relationships are resolved using junction tables.
- Attendance is linked to Class Assignment instead of directly to Subject or Teacher.
- Student IDs remain constant across semester promotions.
- Report Templates and Notifications are user-specific.