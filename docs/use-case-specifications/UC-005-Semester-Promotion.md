# UC-005 - Semester Promotion

## Goal

Allow the Principal to promote eligible students from one semester to the next while preserving all historical academic and attendance records.

---

## Primary Actor

Principal

---

## Preconditions

- Principal is logged in.
- Academic session exists.
- Student records exist.
- Promotion period is active.

---

## Trigger

Principal selects **Semester Promotion** from the Administration module.

---

## Main Success Scenario

1. Principal opens Semester Promotion.
2. System displays eligible students.
3. Principal selects:
   - Academic Session
   - Program
   - Current Semester
   - Target Semester
4. System validates eligibility.
5. System displays a confirmation summary.
6. Principal confirms promotion.
7. System updates students to the new semester.
8. Historical attendance and reports remain unchanged.
9. System records the promotion in the Audit Log.
10. System displays a success message.

---

## Alternative Flows

### A1 - Student Not Eligible

The system excludes the student from promotion.

---

### A2 - Promotion Cancelled

No records are updated.

---

### A3 - Invalid Semester

System prevents promotion.

---

## Exceptions

### E1 - Database Error

Promotion is rolled back.

No student records are modified.

---

## Postconditions

- Eligible students are promoted.
- Attendance history remains unchanged.
- Audit log is updated.

---

## Related Business Rules

- BR-008 Semester Promotion
- BR-010 Audit Trail

---

## Related Functional Requirements

- FR-007 Semester Promotion
- FR-022 Audit Logs