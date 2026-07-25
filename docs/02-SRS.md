# Software Requirements Specification (SRS)

# SmartAttendify

Version: 1.0

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for SmartAttendify, a web-based College Attendance Management System.

The purpose of this document is to establish a clear understanding between stakeholders and the development team regarding the system's features, constraints, and expected behavior.

---

## 1.2 Project Scope

SmartAttendify is designed to simplify attendance management within educational institutions.

The system provides role-based access for administrators, principals, HODs, teachers, and students.

It enables attendance management, report generation, user management, and centralized monitoring through a secure web application.

Version 1 focuses on supporting a single college.

---

## 1.3 Objectives

- Automate attendance management.
- Reduce manual effort.
- Improve attendance accuracy.
- Generate reports automatically.
- Maintain secure user authentication.
- Provide role-based access control.

---

# 2. Definitions

Attendance Record

A digital record representing a student's attendance for a specific class on a particular date.

User

Any authenticated person using the system.

Role

Defines permissions assigned to a user.

Academic Session

The duration covering one academic cycle.

Semester

A division of an academic program.

---

# 3. Stakeholders

Primary Stakeholders

- Principal
- HOD
- Teacher
- Student

Secondary Stakeholders

- College Administration
- Future SaaS Administrator

---

# 4. Overall Description

SmartAttendify is a web-based attendance management platform that centralizes attendance recording and reporting.

The system uses role-based authentication to ensure users access only the features relevant to their responsibilities.

---

# 5. Product Perspective

SmartAttendify is an independent web application.

The system interacts with a PostgreSQL database and is designed to support future mobile applications through REST APIs.

---

# 6. Functional Requirements

## Authentication Module

### FR-001 User Login
The system shall allow users to log in using their unique ID and password.

### FR-002 Role Identification
The system shall identify the user's role after successful authentication and provide the appropriate dashboard.

### FR-003 Logout
The system shall allow authenticated users to log out securely.

---

## Student Management

### FR-004 Add Student
The system shall allow the Principal to register new students.

### FR-005 Update Student
The system shall allow authorized users to update student information.

### FR-006 View Student
The system shall allow authorized users to view student details.

### FR-007 Semester Promotion
The system shall allow the Principal to promote students to the next semester while preserving historical records.

---

## Teacher Management

### FR-008 Add Teacher
The system shall allow the Principal to register teachers.

### FR-009 Update Teacher
The system shall allow authorized users to update teacher information.

### FR-010 Assign HOD
The system shall allow the Principal to assign an HOD to a department.

---

## Attendance Management

### FR-011 Mark Attendance
The system shall allow teachers to mark attendance for assigned classes.

### FR-012 Edit Attendance
The system shall allow teachers to edit attendance within the configured time limit.

### FR-013 Lock Attendance
The system shall automatically prevent attendance modification after the configured deadline.

### FR-014 Unlock Attendance
The system shall allow authorized users to unlock attendance when required.

### FR-015 Attendance History
The system shall maintain attendance history for every student.

---

## Reports

### FR-016 View Attendance Report
The system shall generate attendance reports based on filters such as class, subject, semester, and date range.

### FR-017 Export Attendance Report
The system shall allow attendance reports to be exported as PDF and Excel (.xlsx).

---

## Dashboard

### FR-018 Principal Dashboard
The system shall display overall attendance statistics for the college.

### FR-019 HOD Dashboard
The system shall display department-wise attendance statistics.

### FR-020 Teacher Dashboard
The system shall display attendance statistics for the teacher's assigned classes.

### FR-021 Student Dashboard
The system shall display the student's attendance percentage and attendance history.

---

## Audit

### FR-022 Audit Logs
The system shall record important user activities including attendance modifications, semester promotions, and administrative actions.

---

# 7. Non-Functional Requirements

### NFR-001 Performance
The system should respond to user requests within 3 seconds under normal load.

### NFR-002 Security
Passwords shall be securely hashed before storage.

### NFR-003 Availability
The system should be available whenever the college is operating.

### NFR-004 Reliability
Attendance records shall not be lost due to application errors.

### NFR-005 Usability
The user interface shall be simple and easy to use.

### NFR-006 Scalability
The system shall support future expansion to multiple colleges.

### NFR-007 Maintainability
The software shall follow a modular architecture for easier maintenance.

### NFR-008 Compatibility
The application shall support modern web browsers.