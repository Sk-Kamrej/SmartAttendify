# UC-004 - Generate Attendance Report

## Goal

Allow authorized users to generate attendance reports based on selected filters and export them in different formats.

---

## Primary Actors

- Teacher
- HOD
- Principal

---

## Preconditions

- User is logged in.
- User has permission to view attendance reports.
- Attendance records exist for the selected criteria.

---

## Trigger

User selects **Attendance Reports** from the dashboard.

---

## Main Success Scenario

1. User opens the Attendance Report module.
2. System displays report filters.
3. User selects one or more filters:
   - Academic Session
   - Program
   - Semester
   - Section (if applicable)
   - Department
   - Subject
   - Teacher
   - Date Range
4. User clicks **Generate Report**.
5. System validates the selected filters.
6. System retrieves attendance records.
7. System calculates attendance statistics.
8. System displays the generated attendance report.

9. User may customize the report by:
   - Selecting visible columns
   - Choosing report layout
   - Including or excluding the college logo
   - Including signature section
   - Including generated date and time

10. User selects an export format:
   - PDF
   - Excel (.xlsx)
   - Print

11. System generates the report in the selected format.

12. User may save the current report configuration as a reusable template.

13. System stores the template for future use.

14. System records the report generation in the Audit Log.

---

## Alternative Flows

### A1 - No Records Found

- System displays:
  "No attendance records found for the selected filters."

---

### A2 - Invalid Date Range

- System requests the user to select a valid date range.

---

### A3 - Unauthorized Access

- System denies access.
- Message:
  "You do not have permission to view this report."

---

### A4 - Saved Report Template

1. User selects a saved report template.
2. System automatically loads:
   - Filters
   - Selected columns
   - Report layout
3. User generates the report with one click.

---

## Exceptions

### E1 - Database Error

System displays:

"Unable to generate report. Please try again."

---

## Postconditions

- Attendance report is displayed.
- Exported report is generated if requested.

---

## Related Business Rules

- BR-002 Role-Based Access
- BR-010 Audit Trail

---

## Related Functional Requirements

- FR-016 View Attendance Report
- FR-017 Export Attendance Report