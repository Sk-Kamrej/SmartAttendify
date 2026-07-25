# Business Rules

## BR-001 User Authentication

Every user must log in using valid credentials.

---

## BR-002 Role-Based Access

Each user can access only the modules assigned to their role.

---

## BR-003 Student Identification

Each student shall have one unique Student ID.

No two students can share the same Student ID.

---

## BR-004 Teacher Identification

Each teacher shall have one unique Teacher ID.

---

## BR-005 Attendance Record

A student can have only one attendance record for the same subject, date, and class.

Duplicate attendance records are not allowed.

---

## BR-006 Attendance Modification

Teachers may edit attendance only within the time limit configured by the Principal.

After the deadline, attendance becomes locked unless reopened by an authorized user.

---

## BR-007 Attendance Ownership

Teachers can mark attendance only for classes assigned to them.

---

## BR-008 Semester Promotion

Semester promotion updates the student's current semester without deleting historical attendance records.

---

## BR-009 Data Security

Users cannot access records belonging to unauthorized roles.

---

## BR-010 Audit Trail

Every important modification shall be recorded with:

- User
- Date
- Time
- Action Performed

---

## BR-011 Attendance Policy Configuration

The system shall allow the Principal to configure attendance policy parameters, including:

- Minimum required attendance percentage
- Warning threshold
- Critical threshold
- Attendance calculation method (Overall or Subject-wise)
- Enable or disable attendance alerts

These settings shall apply only to the respective college.