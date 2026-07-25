# UC-001 - Login

## Goal

Allow an authorized user to access the SmartAttendify system.

---

## Primary Actors

- Principal
- HOD
- Teacher
- Student

---

## Preconditions

- User account exists.
- User account is active.
- User knows their User ID and password.

---

## Trigger

The user enters their User ID and password and clicks the Login button.

---

## Main Success Scenario

1. User opens the login page.
2. User enters User ID.
3. User enters password.
4. User clicks Login.
5. System validates the credentials.
6. System identifies the user's role.
7. System creates a secure session.
8. System redirects the user to the appropriate dashboard.

---

## Alternative Flows

### A1 - Invalid Credentials

- The system displays an "Invalid User ID or Password" message.
- The user remains on the login page.

### A2 - Inactive Account

- The system prevents login.
- The user is instructed to contact the administrator.

---

## Postconditions

- User is authenticated.
- User session is active.
- Dashboard is displayed.

---

## Related Business Rules

- BR-001 User Authentication
- BR-002 Role-Based Access

---

## Related Functional Requirements

- FR-001 User Login
- FR-002 Role Identification
- FR-003 Logout