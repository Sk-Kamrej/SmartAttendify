# UC-006 - Configure Attendance Policy

## Goal

Allow the Principal to configure attendance rules for the college.

---

## Primary Actor

Principal

---

## Preconditions

- Principal is logged in.
- User has administrative privileges.

---

## Trigger

Principal opens **Attendance Policy** from the Administration module.

---

## Main Success Scenario

1. Principal opens Attendance Policy.
2. System displays the current policy.
3. Principal configures:
   - Minimum attendance percentage
   - Warning threshold
   - Critical threshold
   - Attendance calculation method (Overall / Subject-wise)
   - Allowed attendance statuses
   - Attendance edit window
   - Student alert settings
4. Principal clicks **Save**.
5. System validates the configuration.
6. System saves the updated policy.
7. System records the action in the Audit Log.
8. System displays a success message.

---

## Alternative Flows

### A1 - Invalid Percentage

- System displays an error if percentages are outside the valid range (0–100).

---

### A2 - Duplicate Attendance Status

- System prevents saving duplicate attendance status names.

---

### A3 - Invalid Edit Window

- System requests a valid number of days or hours for the attendance edit window.

---

## Exceptions

### E1 - Database Error

System displays:

"Unable to save attendance policy. Please try again."

---

## Postconditions

- Attendance policy is updated.
- New settings apply to future attendance operations.
- Audit log entry is created.

---

## Related Business Rules

- BR-005 Attendance Policy
- BR-010 Audit Trail
- BR-011 Configurable Attendance Status

---

## Related Functional Requirements

- FR-024 Configure Attendance Policy
- FR-025 Manage Attendance Status
- FR-026 Configure Attendance Alerts
- FR-027 Configure Edit Window
- FR-022 Audit Logs