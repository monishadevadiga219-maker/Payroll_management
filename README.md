A **production-ready** Full-Stack Payroll Management System with Employee Management, Payroll Processing, Stored Procedures, Triggers, and 10 Advanced SQL Queries.

![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

---

## 🏠 Feature Highlights

| Category | Features |
|----------|----------|
| **Employee Management** | Add, Edit, Delete, Search Employees |
| **Payroll Processing** | Calculate Net Salary (Basic + Bonus - Deductions) |
| **Attendance Tracking** | Track working days & leave days |
| **10 SQL Queries** | Joins, Subqueries, Aggregations, GROUP BY, HAVING |
| **Stored Procedures** | `CalculateSalary()` – Generates monthly salary report |
| **Triggers** | `AfterAttendanceUpdate` – Auto salary recalculation <br> `BeforeLeaveInsert` – Blocks leave beyond 5 days |
| **Payslip Generation** | Printable salary slips |
| **RESTful API** | Full CRUD operations on Employees & Payroll |
| **Glassmorphic UI** | Modern, responsive design with animations |

---

## 🧱 System Architecture

```mermaid
graph TB
    subgraph CLIENT["Frontend (HTML/CSS/JS)"]
        UI["Glassmorphic UI<br/>(index.html)"]
        CSS["Modern Styling<br/>(style.css)"]
        JS["Vanilla JS Logic<br/>(app.js)"]
    end

    subgraph SERVER["Backend (Express.js)"]
        API["REST API Routes<br/>/api/employees, /api/payroll"]
        CORS["CORS Enabled"]
        PARSER["JSON Body Parser"]
    end

    subgraph DATABASE["JSON File Storage"]
        EMP["employee.json"]
        PAY["payroll.json"]
    end

    UI --> API
    API --> EMP
    API --> PAY
```

---

📊 Entity-Relationship Diagram

```mermaid
erDiagram
    EMPLOYEE ||--o{ PAYROLL : has

    EMPLOYEE {
        int id PK
        string name
        string department
        string position
        float salary
        string email
        string phone
        date joinDate
    }

    PAYROLL {
        int id PK
        int employeeId FK
        float basicSalary
        float bonus
        float deductions
        float netSalary
        string month
        int attendance
        int leaveDays
    }
```

---

🔁 Payroll Lifecycle Flowchart

```mermaid
flowchart TD
    A[Employee Joins] --> B[Add to Employee Table]
    B --> C[Record Monthly Attendance]
    C --> D{Trigger: AfterAttendanceUpdate}
    D -->|Auto| E[Recalculate Salary]
    E --> F[Calculate Net = Basic + Bonus - Deductions]
    F --> G[Store in Payroll Table]
    G --> H[Generate Payslip]
    H --> I[Process Payment]

    style D fill:#fef3c7,stroke:#f59e0b
    style E fill:#d1fae5,stroke:#10b981
    style H fill:#dbeafe,stroke:#3b82f6
```

---

📜 Stored Procedures & Triggers

Stored Procedures

Procedure Name Parameters Description
CalculateSalary(emp_id, month) Employee ID, Month Calculates net salary and returns payroll details
GeneratePayslip(emp_id, month) Employee ID, Month Generates printable payslip HTML

Triggers

Trigger Name Event Action
AfterAttendanceUpdate AFTER UPDATE ON Attendance Auto-recalculates salary based on attendance
BeforeLeaveInsert BEFORE INSERT ON Leave Blocks leave request if total > 5 days in a month

---

🔟 The 10 Advanced SQL Queries

# Query Description SQL Concepts
1 Retrieve all employees SELECT * 
2 Employees by department WHERE clause
3 Employee + Salary (INNER JOIN) INNER JOIN
4 Full details with payroll (3 tables) Multiple JOINS
5 Count employees per department COUNT, GROUP BY
6 Departments with avg salary > 50000 AVG, HAVING
7 Employees above average salary Subquery
8 Employees earning more than specific employee Self-join
9 Employees with/without salary (LEFT JOIN) LEFT JOIN, IS NULL
10 Departments with no employees NOT EXISTS

(All queries are runnable from the SQL Queries tab in the UI)

---

🚀 Quick Start Guide

Prerequisites

· Node.js v18+ and npm
· Modern web browser

Step 1 – Install Backend Dependencies

```bash
cd backend
npm install
```

Step 2 – Start the Backend Server

```bash
npm start
# OR
node server.js
```

✅ Expected: 🚀 Backend server running on http://localhost:5000

Step 3 – Start the Frontend

Simply open frontend/index.html in your browser
OR use Live Server extension in VS Code

---

🧪 Testing Triggers (Demo)

Trigger 1 – Auto Salary Update

1. Go to Triggers tab
2. Enter Employee ID and month
3. Update attendance days
4. Net salary recalculates automatically

Trigger 2 – Leave Request Block

1. Go to Triggers tab
2. Request more than 5 days of leave
3. Trigger blocks the request with error message

---

🎨 Tech Stack Summary

```mermaid
pie title Technology Distribution
    "Express.js (Backend)" : 25
    "Frontend (HTML/CSS/JS)" : 40
    "JSON Storage" : 15
    "Node.js Runtime" : 20
```

---

📁 Project Structure

```
Payroll_management/
├── frontend/
│   ├── index.html      # Main UI
│   ├── style.css       # Glassmorphic styling
│   └── app.js          # Frontend logic & API calls
├── backend/
│   ├── server.js       # Express.js REST API
│   ├── package.json    # Dependencies
│   └── package-lock.json
├── data/
│   ├── employee.json   # Employee data storage
│   └── payroll.json    # Payroll data storage
└── README.md
```

---

🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

📄 License

Distributed under the ISC License.

---

Built with by Monisha Devadiga – A Complete DBMS & Full-Stack Project