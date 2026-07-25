# UC-003 - Edit Attendance

## Goal

Allow a teacher to modify attendance records within the permitted edit window.

---

## Primary Actor

Teacher

---

## Supporting Actors

- HOD (can unlock attendance if authorized)
- Principal

---

## Preconditions

- Teacher is logged in.
- Attendance record already exists.
- Teacher is assigned to the class.
- Attendance edit window is open OR attendance has been unlocked by an authorized user.

---

## Trigger

Teacher selects an existing attendance record and clicks **Edit Attendance**.

---

## Main Success Scenario

1. Teacher opens Attendance History.
2. Teacher selects the attendance record.
3. System verifies edit permission.
4. System displays the attendance list.
5. Teacher updates the required attendance status.
6. Teacher clicks **Save Changes**.
7. System validates the changes.
8. System updates the attendance records.
9. System recalculates attendance percentages.
10. System updates student alerts if required.
11. System records the modification in the Audit Log.
12. System displays a success message.

---

## Alternative Flows

### A1 - Edit Window Closed

- System denies editing.
- Message:
  "Attendance can no longer be edited."

---

### A2 - Attendance Locked

- System informs the teacher that attendance is locked.
- Teacher may request the HOD or Principal to unlock it.

---

### A3 - Unauthorized Teacher

- System denies access.
- Message:
  "You are not authorized to edit this attendance."

---

## Exceptions

### E1 - Database Error

System displays:

"Unable to update attendance. Please try again."

---

## Postconditions

- Attendance record is updated.
- Attendance percentage is recalculated.
- Student notifications are refreshed if necessary.
- Audit log entry is created.

---

## Related Business Rules

- BR-006 Attendance Modification
- BR-007 Attendance Ownership
- BR-010 Audit Trail

---

## Related Functional Requirements

- FR-012 Edit Attendance
- FR-013 Lock Attendance
- FR-022 Audit Logs