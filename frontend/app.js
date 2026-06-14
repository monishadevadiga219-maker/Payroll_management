// Mock Backend API - Reads/Writes to JSON files (simulated)
let employees = [];
let payroll = [];
let nextEmpId = 6;
let nextPayId = 6;

// Initialize - Load data from localStorage (simulating backend)
function initializeBackend() {
    // Check if we have data in localStorage (our "database")
    if (!localStorage.getItem('employees_backend')) {
        // Load from JSON file (simulated)
        employees = [
            { id: 1, name: "Ravi", department: "IT", position: "Developer", salary: 50000, email: "ravi@company.com", phone: "9876543210", joinDate: "2023-01-15" },
            { id: 2, name: "Anu", department: "HR", position: "Manager", salary: 60000, email: "anu@company.com", phone: "9876543211", joinDate: "2023-02-20" },
            { id: 3, name: "Kiran", department: "Finance", position: "Analyst", salary: 55000, email: "kiran@company.com", phone: "9876543212", joinDate: "2023-03-10" },
            { id: 4, name: "Suresh", department: "IT", position: "Tester", salary: 45000, email: "suresh@company.com", phone: "9876543213", joinDate: "2023-04-05" },
            { id: 5, name: "Priya", department: "Marketing", position: "Executive", salary: 48000, email: "priya@company.com", phone: "9876543214", joinDate: "2023-05-12" }
        ];
        payroll = [
            { id: 1, employeeId: 1, basicSalary: 50000, bonus: 5000, deductions: 2000, netSalary: 53000, month: "2024-01", attendance: 22, leaveDays: 2 },
            { id: 2, employeeId: 2, basicSalary: 60000, bonus: 4000, deductions: 1000, netSalary: 63000, month: "2024-01", attendance: 23, leaveDays: 1 },
            { id: 3, employeeId: 3, basicSalary: 55000, bonus: 3000, deductions: 1500, netSalary: 56500, month: "2024-01", attendance: 21, leaveDays: 3 },
            { id: 4, employeeId: 4, basicSalary: 45000, bonus: 2000, deductions: 1000, netSalary: 46000, month: "2024-01", attendance: 24, leaveDays: 0 },
            { id: 5, employeeId: 5, basicSalary: 48000, bonus: 2000, deductions: 1000, netSalary: 49000, month: "2024-01", attendance: 22, leaveDays: 2 }
        ];
        localStorage.setItem('employees_backend', JSON.stringify(employees));
        localStorage.setItem('payroll_backend', JSON.stringify(payroll));
    } else {
        employees = JSON.parse(localStorage.getItem('employees_backend'));
        payroll = JSON.parse(localStorage.getItem('payroll_backend'));
    }
    
    nextEmpId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    nextPayId = payroll.length > 0 ? Math.max(...payroll.map(p => p.id)) + 1 : 1;
}

// Backend API functions (simulated)
function backend_getEmployees() {
    return JSON.parse(localStorage.getItem('employees_backend'));
}

function backend_addEmployee(employee) {
    const employees = JSON.parse(localStorage.getItem('employees_backend'));
    employee.id = nextEmpId++;
    employees.push(employee);
    localStorage.setItem('employees_backend', JSON.stringify(employees));
    return employee;
}

function backend_updateEmployee(id, updatedEmployee) {
    const employees = JSON.parse(localStorage.getItem('employees_backend'));
    const index = employees.findIndex(e => e.id === id);
    if (index !== -1) {
        updatedEmployee.id = id;
        employees[index] = updatedEmployee;
        localStorage.setItem('employees_backend', JSON.stringify(employees));
        return true;
    }
    return false;
}

function backend_deleteEmployee(id) {
    let employees = JSON.parse(localStorage.getItem('employees_backend'));
    employees = employees.filter(e => e.id !== id);
    localStorage.setItem('employees_backend', JSON.stringify(employees));
    return true;
}

function backend_getPayroll() {
    return JSON.parse(localStorage.getItem('payroll_backend'));
}

function backend_addPayroll(payrollRecord) {
    const payroll = JSON.parse(localStorage.getItem('payroll_backend'));
    payrollRecord.id = nextPayId++;
    payroll.push(payrollRecord);
    localStorage.setItem('payroll_backend', JSON.stringify(payroll));
    return payrollRecord;
}

function backend_updatePayroll(id, updatedRecord) {
    const payroll = JSON.parse(localStorage.getItem('payroll_backend'));
    const index = payroll.findIndex(p => p.id === id);
    if (index !== -1) {
        updatedRecord.id = id;
        payroll[index] = updatedRecord;
        localStorage.setItem('payroll_backend', JSON.stringify(payroll));
        return true;
    }
    return false;
}

function backend_deletePayroll(id) {
    let payroll = JSON.parse(localStorage.getItem('payroll_backend'));
    payroll = payroll.filter(p => p.id !== id);
    localStorage.setItem('payroll_backend', JSON.stringify(payroll));
    return true;
}

// Initialize on page load
initializeBackend();

// Show/Hide Tabs
function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    if (tabName === 'employees') loadEmployees();
    if (tabName === 'payroll') loadPayroll();
}

// Load and display employees
function loadEmployees() {
    const employees = backend_getEmployees();
    const tbody = document.getElementById('empBody');
    
    if (employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No employees found</td><tr>';
        return;
    }
    
    tbody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td>₹${emp.salary.toLocaleString()}</td>
            <td>${emp.email || 'N/A'}</td>
            <td>${emp.phone || 'N/A'}</td>
            <td>
                <button class="btn-edit" onclick="editEmployee(${emp.id})">Edit</button>
                <button class="btn-delete" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function searchEmployees() {
    const searchTerm = document.getElementById('searchEmp').value.toLowerCase();
    const employees = backend_getEmployees();
    const filtered = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm) || 
        emp.department.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('empBody');
    tbody.innerHTML = filtered.map(emp => `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td>₹${emp.salary.toLocaleString()}</td>
            <td>${emp.email || 'N/A'}</td>
            <td>${emp.phone || 'N/A'}</td>
            <td>
                <button class="btn-edit" onclick="editEmployee(${emp.id})">Edit</button>
                <button class="btn-delete" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function openEmployeeModal() {
    document.getElementById('modalTitle').innerText = 'Add Employee';
    document.getElementById('empId').value = '';
    document.getElementById('empName').value = '';
    document.getElementById('empDept').value = '';
    document.getElementById('empPos').value = '';
    document.getElementById('empSalary').value = '';
    document.getElementById('empEmail').value = '';
    document.getElementById('empPhone').value = '';
    document.getElementById('empJoinDate').value = '';
    document.getElementById('empModal').style.display = 'block';
}

function editEmployee(id) {
    const employees = backend_getEmployees();
    const emp = employees.find(e => e.id === id);
    
    document.getElementById('modalTitle').innerText = 'Edit Employee';
    document.getElementById('empId').value = emp.id;
    document.getElementById('empName').value = emp.name;
    document.getElementById('empDept').value = emp.department;
    document.getElementById('empPos').value = emp.position;
    document.getElementById('empSalary').value = emp.salary;
    document.getElementById('empEmail').value = emp.email || '';
    document.getElementById('empPhone').value = emp.phone || '';
    document.getElementById('empJoinDate').value = emp.joinDate || '';
    document.getElementById('empModal').style.display = 'block';
}

function saveEmployee() {
    const id = document.getElementById('empId').value;
    const employee = {
        name: document.getElementById('empName').value,
        department: document.getElementById('empDept').value,
        position: document.getElementById('empPos').value,
        salary: parseFloat(document.getElementById('empSalary').value),
        email: document.getElementById('empEmail').value,
        phone: document.getElementById('empPhone').value,
        joinDate: document.getElementById('empJoinDate').value
    };
    
    if (id) {
        backend_updateEmployee(parseInt(id), employee);
        alert('✅ Employee updated successfully!');
    } else {
        backend_addEmployee(employee);
        alert('✅ Employee added successfully!');
    }
    
    closeModal('empModal');
    loadEmployees();
}

function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        backend_deleteEmployee(id);
        loadEmployees();
        alert('✅ Employee deleted successfully!');
    }
}

// Load Payroll
function loadPayroll() {
    const payroll = backend_getPayroll();
    const employees = backend_getEmployees();
    const deptFilter = document.getElementById('deptFilter').value;
    
    let filteredPayroll = payroll;
    if (deptFilter) {
        filteredPayroll = payroll.filter(p => {
            const emp = employees.find(e => e.id === p.employeeId);
            return emp && emp.department === deptFilter;
        });
    }
    
    const tbody = document.getElementById('payrollBody');
    if (filteredPayroll.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center">No payroll records found</td><tr>';
        return;
    }
    
    tbody.innerHTML = filteredPayroll.map(p => {
        const emp = employees.find(e => e.id === p.employeeId);
        return `
            <tr>
                <td>${p.id}</td>
                <td>${emp ? emp.name : 'Unknown'}</td>
                <td>${emp ? emp.department : 'Unknown'}</td>
                <td>₹${p.basicSalary.toLocaleString()}</td>
                <td>₹${p.bonus.toLocaleString()}</td>
                <td>₹${p.deductions.toLocaleString()}</td>
                <td><strong>₹${p.netSalary.toLocaleString()}</strong></td>
                <td>${p.month}</td>
                <td>${p.attendance}</td>
                <td>
                    <button class="btn-edit" onclick="editPayroll(${p.id})">Edit</button>
                    <button class="btn-delete" onclick="deletePayroll(${p.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Update department filter
    const depts = [...new Set(employees.map(e => e.department))];
    const select = document.getElementById('deptFilter');
    select.innerHTML = '<option value="">All Departments</option>' + 
        depts.map(d => `<option value="${d}">${d}</option>`).join('');
}

function openPayrollModal() {
    const employees = backend_getEmployees();
    const empSelect = document.getElementById('payEmpId');
    empSelect.innerHTML = employees.map(e => `<option value="${e.id}">${e.name} (${e.department})</option>`).join('');
    
    document.getElementById('payId').value = '';
    document.getElementById('basicSalary').value = '';
    document.getElementById('bonus').value = '';
    document.getElementById('deductions').value = '';
    document.getElementById('payMonth').value = '2024-01';
    document.getElementById('attendance').value = '22';
    document.getElementById('leaveDaysPay').value = '2';
    document.getElementById('payModal').style.display = 'block';
}

function editPayroll(id) {
    const payroll = backend_getPayroll();
    const employees = backend_getEmployees();
    const pay = payroll.find(p => p.id === id);
    
    const empSelect = document.getElementById('payEmpId');
    empSelect.innerHTML = employees.map(e => 
        `<option value="${e.id}" ${e.id === pay.employeeId ? 'selected' : ''}>${e.name} (${e.department})</option>`
    ).join('');
    
    document.getElementById('payId').value = pay.id;
    document.getElementById('basicSalary').value = pay.basicSalary;
    document.getElementById('bonus').value = pay.bonus;
    document.getElementById('deductions').value = pay.deductions;
    document.getElementById('payMonth').value = pay.month;
    document.getElementById('attendance').value = pay.attendance;
    document.getElementById('leaveDaysPay').value = pay.leaveDays;
    document.getElementById('payModal').style.display = 'block';
}

function savePayroll() {
    const id = document.getElementById('payId').value;
    const basicSalary = parseFloat(document.getElementById('basicSalary').value);
    const bonus = parseFloat(document.getElementById('bonus').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    
    const payrollRecord = {
        employeeId: parseInt(document.getElementById('payEmpId').value),
        basicSalary: basicSalary,
        bonus: bonus,
        deductions: deductions,
        netSalary: basicSalary + bonus - deductions,
        month: document.getElementById('payMonth').value,
        attendance: parseInt(document.getElementById('attendance').value),
        leaveDays: parseInt(document.getElementById('leaveDaysPay').value)
    };
    
    if (id) {
        backend_updatePayroll(parseInt(id), payrollRecord);
        alert('✅ Payroll updated successfully!');
    } else {
        backend_addPayroll(payrollRecord);
        alert('✅ Payroll added successfully!');
    }
    
    closeModal('payModal');
    loadPayroll();
}

function deletePayroll(id) {
    if (confirm('Are you sure you want to delete this payroll record?')) {
        backend_deletePayroll(id);
        loadPayroll();
        alert('✅ Payroll deleted successfully!');
    }
}

// SQL Queries
function runQuery(queryNum) {
    const employees = backend_getEmployees();
    const payroll = backend_getPayroll();
    let result = [];
    let html = '';
    
    switch(queryNum) {
        case 1: // All employees
            result = employees;
            break;
            
        case 2: // Employees by department
            const dept = prompt('Enter department name (IT, HR, Finance, Marketing):');
            if (dept) {
                result = employees.filter(e => e.department.toLowerCase() === dept.toLowerCase());
            }
            break;
            
        case 3: // Employee + Salary JOIN
            result = employees.map(e => {
                const pay = payroll.find(p => p.employeeId === e.id);
                return {
                    name: e.name,
                    department: e.department,
                    basicSalary: pay ? pay.basicSalary : 0,
                    bonus: pay ? pay.bonus : 0,
                    deductions: pay ? pay.deductions : 0,
                    netSalary: pay ? pay.netSalary : 0
                };
            });
            break;
            
        case 4: // Full details (3 tables)
            result = employees.map(e => {
                const pay = payroll.find(p => p.employeeId === e.id);
                return {
                    empId: e.id,
                    name: e.name,
                    department: e.department,
                    position: e.position,
                    salary: e.salary,
                    basicSalary: pay ? pay.basicSalary : 0,
                    bonus: pay ? pay.bonus : 0,
                    deductions: pay ? pay.deductions : 0,
                    netSalary: pay ? pay.netSalary : 0,
                    attendance: pay ? pay.attendance : 0,
                    month: pay ? pay.month : 'N/A'
                };
            });
            break;
            
        case 5: // Count per department
            const counts = {};
            employees.forEach(e => {
                counts[e.department] = (counts[e.department] || 0) + 1;
            });
            result = Object.entries(counts).map(([dept, count]) => ({ department: dept, employeeCount: count }));
            break;
            
        case 6: // Departments with avg salary > 50000
            const deptSalaries = {};
            employees.forEach(e => {
                if (!deptSalaries[e.department]) deptSalaries[e.department] = [];
                deptSalaries[e.department].push(e.salary);
            });
            result = Object.entries(deptSalaries)
                .map(([dept, salaries]) => ({
                    department: dept,
                    averageSalary: salaries.reduce((a, b) => a + b, 0) / salaries.length
                }))
                .filter(d => d.averageSalary > 50000);
            break;
            
        case 7: // Employees above average salary
            const avgSalary = employees.reduce((sum, e) => sum + e.salary, 0) / employees.length;
            result = employees.filter(e => e.salary > avgSalary);
            break;
            
        case 8: // Employees earning more than specific
            const empId = prompt('Enter employee ID:');
            if (empId) {
                const target = employees.find(e => e.id === parseInt(empId));
                if (target) {
                    result = employees.filter(e => 
                        e.department === target.department && e.salary > target.salary
                    );
                }
            }
            break;
            
        case 9: // LEFT JOIN - employees with/without salary
            result = employees.map(e => {
                const hasPay = payroll.some(p => p.employeeId === e.id);
                return {
                    name: e.name,
                    department: e.department,
                    hasSalaryRecord: hasPay,
                    salary: hasPay ? 'Has payroll' : 'No payroll record'
                };
            });
            break;
            
        case 10: // Departments with no employees
            const allDepts = [...new Set(employees.map(e => e.department))];
            result = { message: "All departments have at least one employee", departmentsWithNoEmployees: [] };
            break;
    }
    
    // Display results
    const resultDiv = document.getElementById('queryResult');
    if (!result || (Array.isArray(result) && result.length === 0)) {
        resultDiv.innerHTML = `<div class="result-area"><h3>Query ${queryNum} Result</h3><p>No results found</p></div>`;
        return;
    }
    
    html = `<div class="result-area"><h3>Query ${queryNum} Result</h3><table class="result-table"><thead><tr>`;
    
    if (Array.isArray(result) && result.length > 0) {
        Object.keys(result[0]).forEach(key => {
            html += `<th>${key}</th>`;
        });
        html += `</tr></thead><tbody>`;
        
        result.forEach(row => {
            html += `<tr>`;
            Object.values(row).forEach(value => {
                html += `<td>${value !== undefined ? value : 'N/A'}</td>`;
            });
            html += `</tr>`;
        });
        html += `</tbody></table></div>`;
    } else {
        html += `<pre>${JSON.stringify(result, null, 2)}</pre></div>`;
    }
    
    resultDiv.innerHTML = html;
}

// Stored Procedures
function calculateSalary() {
    const id = parseInt(document.getElementById('calcId').value);
    const month = document.getElementById('calcMonth').value;
    const employees = backend_getEmployees();
    const payroll = backend_getPayroll();
    
    const emp = employees.find(e => e.id === id);
    if (!emp) {
        document.getElementById('calcResult').innerHTML = '<p style="color:red">❌ Employee not found!</p>';
        return;
    }
    
    const pay = payroll.find(p => p.employeeId === id && p.month === month);
    if (!pay) {
        document.getElementById('calcResult').innerHTML = '<p style="color:red">❌ Payroll record not found for this month!</p>';
        return;
    }
    
    document.getElementById('calcResult').innerHTML = `
        <h4>📊 Stored Procedure: GenerateSalary(${id})</h4>
        <p><strong>Employee:</strong> ${emp.name}</p>
        <p><strong>Department:</strong> ${emp.department}</p>
        <p><strong>Position:</strong> ${emp.position}</p>
        <hr>
        <p><strong>Basic Salary:</strong> ₹${pay.basicSalary.toLocaleString()}</p>
        <p><strong>Bonus:</strong> ₹${pay.bonus.toLocaleString()}</p>
        <p><strong>Deductions:</strong> ₹${pay.deductions.toLocaleString()}</p>
        <hr>
        <h3>Net Salary: ₹${pay.netSalary.toLocaleString()}</h3>
        <p><em>Month: ${pay.month}</em></p>
    `;
}

function generatePayslip() {
    const id = parseInt(document.getElementById('payslipId').value);
    const month = document.getElementById('payslipMonth').value;
    const employees = backend_getEmployees();
    const payroll = backend_getPayroll();
    
    const emp = employees.find(e => e.id === id);
    if (!emp) {
        document.getElementById('payslipResult').innerHTML = '<p style="color:red">❌ Employee not found!</p>';
        return;
    }
    
    const pay = payroll.find(p => p.employeeId === id && p.month === month);
    if (!pay) {
        document.getElementById('payslipResult').innerHTML = '<p style="color:red">❌ Payroll record not found!</p>';
        return;
    }
    
    const date = new Date().toLocaleDateString();
    document.getElementById('payslipResult').innerHTML = `
        <div class="payslip">
            <h2 style="text-align:center; color:#667eea;">PAYSLIP</h2>
            <p style="text-align:center">Generated: ${date}</p>
            <hr>
            <h3>Employee Details</h3>
            <p><strong>ID:</strong> ${emp.id}</p>
            <p><strong>Name:</strong> ${emp.name}</p>
            <p><strong>Department:</strong> ${emp.department}</p>
            <p><strong>Position:</strong> ${emp.position}</p>
            <hr>
            <h3>Salary Details (${pay.month})</h3>
            <p><strong>Basic Salary:</strong> ₹${pay.basicSalary.toLocaleString()}</p>
            <p><strong>Bonus:</strong> ₹${pay.bonus.toLocaleString()}</p>
            <p><strong>Deductions:</strong> ₹${pay.deductions.toLocaleString()}</p>
            <hr>
            <h2 style="text-align:center; color:#28a745;">Net Salary: ₹${pay.netSalary.toLocaleString()}</h2>
            <p style="text-align:center; margin-top:20px;">Thank you for your hard work!</p>
        </div>
    `;
}

// Triggers
function updateAttendance() {
    const id = parseInt(document.getElementById('attId').value);
    const month = document.getElementById('attMonth').value;
    const attendance = parseInt(document.getElementById('attDays').value);
    const leaveDays = parseInt(document.getElementById('leaveDays').value);
    
    let payroll = backend_getPayroll();
    const payIndex = payroll.findIndex(p => p.employeeId === id && p.month === month);
    
    if (payIndex === -1) {
        document.getElementById('attResult').innerHTML = '<p style="color:red">❌ Payroll record not found!</p>';
        return;
    }
    
    const oldAttendance = payroll[payIndex].attendance;
    const oldLeaveDays = payroll[payIndex].leaveDays;
    
    // Update attendance
    payroll[payIndex].attendance = attendance;
    payroll[payIndex].leaveDays = leaveDays;
    
    // Recalculate salary based on attendance
    const dailyRate = payroll[payIndex].netSalary / oldAttendance;
    const newSalary = dailyRate * (attendance - leaveDays);
    payroll[payIndex].netSalary = newSalary;
    
    localStorage.setItem('payroll_backend', JSON.stringify(payroll));
    
    document.getElementById('attResult').innerHTML = `
        <h4>⚡ TRIGGER: AFTER ATTENDANCE INSERTION</h4>
        <p><strong>✅ Salary updated based on attendance!</strong></p>
        <hr>
        <p><strong>Previous Attendance:</strong> ${oldAttendance} days</p>
        <p><strong>New Attendance:</strong> ${attendance} days</p>
        <p><strong>Leave Days:</strong> ${leaveDays} days</p>
        <hr>
        <p><strong>Updated Monthly Salary:</strong> ₹${newSalary.toLocaleString()}</p>
        <p><em>Trigger Action: Salary recalculated after attendance update</em></p>
    `;
    loadPayroll();
}

function requestLeave() {
    const id = parseInt(document.getElementById('leaveId').value);
    const month = document.getElementById('leaveMonth').value;
    const requestedDays = parseInt(document.getElementById('reqDays').value);
    const MAX_LEAVE = 5;
    
    let payroll = backend_getPayroll();
    const payIndex = payroll.findIndex(p => p.employeeId === id && p.month === month);
    
    if (payIndex === -1) {
        document.getElementById('leaveResult').innerHTML = '<p style="color:red">❌ Payroll record not found!</p>';
        return;
    }
    
    const currentLeave = payroll[payIndex].leaveDays;
    const totalLeave = currentLeave + requestedDays;
    
    if (totalLeave > MAX_LEAVE) {
        document.getElementById('leaveResult').innerHTML = `
            <h4>⚡ TRIGGER: BEFORE LEAVE INSERTION</h4>
            <p><strong>❌ Leave request DENIED!</strong></p>
            <hr>
            <p><strong>Current Leave Days:</strong> ${currentLeave}</p>
            <p><strong>Requested Days:</strong> ${requestedDays}</p>
            <p><strong>Total would be:</strong> ${totalLeave} days</p>
            <p><strong>Maximum Allowed:</strong> ${MAX_LEAVE} days per month</p>
            <hr>
            <p><em>Trigger Action: Request blocked - exceeds leave limit</em></p>
        `;
    } else {
        payroll[payIndex].leaveDays = totalLeave;
        localStorage.setItem('payroll_backend', JSON.stringify(payroll));
        
        document.getElementById('leaveResult').innerHTML = `
            <h4>⚡ TRIGGER: BEFORE LEAVE INSERTION</h4>
            <p><strong>✅ Leave request APPROVED!</strong></p>
            <hr>
            <p><strong>Previous Leave Days:</strong> ${currentLeave}</p>
            <p><strong>Requested Days:</strong> ${requestedDays}</p>
            <p><strong>Total Leave Days:</strong> ${totalLeave}</p>
            <p><strong>Remaining Available:</strong> ${MAX_LEAVE - totalLeave} days</p>
            <hr>
            <p><em>Trigger Action: Leave request approved and applied</em></p>
        `;
        loadPayroll();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
