# UC-002 - Mark Attendance

## Goal

Allow a teacher to record attendance for students in an assigned class.

---

## Primary Actor

Teacher

---

## Supporting Actors

- HOD (can perform this action if acting as a teacher)
- Principal (view only, cannot mark attendance)

---

## Preconditions

- Teacher is logged in.
- Teacher account is active.
- Teacher has at least one assigned class.
- Attendance date is within the active academic session.

---

## Trigger

Teacher selects **Mark Attendance** from the dashboard.

---

## Main Success Scenario

1. Teacher opens the Attendance module.
2. System displays assigned classes.
3. Teacher selects:
   - Academic Session
   - Program
   - Semester
   - Section (if applicable)
   - Subject
   - Date
4. System displays the student list.
5. Teacher marks each student as:
   - Present
   - Absent
   - Late (optional)
   - Leave (optional)
6. Teacher clicks **Submit Attendance**.
7. System validates the data.
8. System saves the attendance records.
9. System recalculates attendance percentages.
10. System checks the college attendance policy.
11. System generates alerts for students if required.
12. System records the action in the Audit Log.
13. System displays a success message.

---

## Alternative Flows

### A1 - Attendance Already Exists

- System informs the teacher that attendance has already been recorded.
- Teacher may edit it only if the edit window is still open.

---

### A2 - Teacher Not Assigned

- System denies access.
- Message:
  "You are not assigned to this class."

---

### A3 - Invalid Academic Selection

- System prevents submission.
- Teacher must select valid session, semester, and subject.

---

### A4 - Attendance Window Closed

- System prevents new submission or modification.
- Teacher is instructed to contact the HOD or Principal if changes are required.

---

## Exceptions

### E1 - Database Error

System displays:

"Unable to save attendance. Please try again."

No attendance data is stored.

---

## Postconditions

- Attendance is successfully stored.
- Attendance percentage is updated.
- Alerts are generated (if enabled).
- Audit log entry is created.

---

## Related Business Rules

- BR-005 Attendance Record
- BR-006 Attendance Modification
- BR-007 Attendance Ownership
- BR-010 Audit Trail
- BR-011 Attendance Policy Configuration

---

## Related Functional Requirements

- FR-011 Mark Attendance
- FR-013 Lock Attendance
- FR-015 Attendance History
- FR-022 Audit Logs