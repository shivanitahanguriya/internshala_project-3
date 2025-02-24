const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

const students = [];
let editingIndex = -1;

// Function for form submission and add/edit student data
studentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Geting the form field values
    const name = document.getElementById('name').value;
    const Id = document.getElementById('Id').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;


    // Create a new student object
    const newStudent = {
        name: name,
        Id: Id,
        email: email,
        contact: contact
    };


    if (editingIndex === -1) {
        students.push(newStudent);
    } else {
        students[editingIndex] = newStudent;
        editingIndex = -1;
    }

    // Clear the form fields
    studentForm.reset();

    // Display the updated student records
    displayStudentRecords();
});

// Function to display the student records in the table
function displayStudentRecords() {
    studentTableBody.innerHTML = '';

    students.forEach((student, index) => {
        // Create a new row
        const row = document.createElement('tr');

        // Create and append the cells for the student data
        Object.values(student).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Add Edit and Delete buttons
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        // Set edit button functionality
        editButton.addEventListener('click', function () {
            editStudent(index);
        });

        // Set delete button functionality
        deleteButton.addEventListener('click', function () {
            deleteStudent(index);
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        // Append the row to the table body
        studentTableBody.appendChild(row);
        console.log(studentTableBody);

    });
}

// Function to edit a student
function editStudent(index) {
    // Fill the form with the student's current data
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('Id').value = student.Id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;


    // Set the editingIndex to the index of the student being edited
    editingIndex = index;
}

// Function to delete a student
function deleteStudent(index) {
    // Remove the student from the array
    students.splice(index, 1);

    // Display the updated student records
    displayStudentRecords();
}
