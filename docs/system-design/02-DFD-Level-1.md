# DFD Level 1

## Purpose

DFD Level 1 decomposes the SmartAttendify system into its major functional processes. It illustrates how external entities interact with different modules of the system and how information flows between them.

This diagram provides a high-level understanding of the internal structure without showing implementation details or database tables.

---

## Scope

The DFD Level 1 includes:

- Major system processes
- External entities
- Data stores
- Data flows between processes

It excludes:

- Database schema
- API implementation
- Internal algorithms

---

## Mermaid Diagram

```mermaid
flowchart LR

%% External Entities
Student[Student]
Teacher[Teacher]
HOD[HOD]
Principal[Principal]

%% Processes
P1((1.0 Authentication))
P2((2.0 Attendance Management))
P3((3.0 Report Center))
P4((4.0 Attendance Policy))
P5((5.0 Semester Promotion))

%% Data Stores
D1[(Users Database)]
D2[(Attendance Database)]
D3[(Policy Database)]

%% Authentication
Student -->|Login Credentials| P1
Teacher -->|Login Credentials| P1
HOD -->|Login Credentials| P1
Principal -->|Login Credentials| P1

P1 --> D1
D1 --> P1

%% Attendance
Teacher -->|Mark/Edit Attendance| P2
P2 --> D2
D2 --> P2
P2 --> Student

%% Reports
Teacher -->|Report Request| P3
HOD -->|Department Report| P3
Principal -->|Institution Report| P3

P3 --> D2
D2 --> P3

P3 --> Teacher
P3 --> HOD
P3 --> Principal

%% Attendance Policy
Principal -->|Configure Policy| P4

P4 --> D3
D3 --> P4

%% Semester Promotion
Principal -->|Promotion Request| P5
P5 --> D1
D1 --> P5
```

---

## Processes

### 1.0 Authentication

Responsible for:

- User login
- Credential validation
- Role identification
- Session creation

---

### 2.0 Attendance Management

Responsible for:

- Mark attendance
- Edit attendance
- Calculate attendance percentage
- Generate attendance alerts

---

### 3.0 Report Center

Responsible for:

- Generate reports
- Filter reports
- Export PDF
- Export Excel
- Print reports

---

### 4.0 Attendance Policy

Responsible for:

- Attendance percentage rules
- Warning thresholds
- Attendance statuses
- Edit window configuration

---

### 5.0 Semester Promotion

Responsible for:

- Student promotion
- Validation
- Promotion history
- Academic record update

---

## Data Stores

### D1 Users Database

Stores:

- Students
- Teachers
- HODs
- Principal

---

### D2 Attendance Database

Stores:

- Attendance records
- Attendance history
- Attendance statistics

---

### D3 Policy Database

Stores:

- Attendance rules
- Status configuration
- Alert configuration

---

## Design Decisions

- Authentication is separated from Attendance Management.
- Report generation is an independent module.
- Attendance policies are configurable.
- Semester Promotion is isolated as an administrative process.
- Data stores are shared where appropriate to avoid duplication.

---

## Future Improvements

Future versions may introduce:

- Notification Center
- Parent Portal
- Mobile App Integration
- AI Analytics
- Multi-college Management
- Audit Log Management