// Student Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Student Application loaded successfully!');
    
    // DOM Elements
    const studentListScreen = document.getElementById('student-list-screen');
    const addStudentScreen = document.getElementById('add-student-screen');
    const studentDetailsScreen = document.getElementById('student-details-screen');
    const studentList = document.getElementById('student-list');
    const studentForm = document.getElementById('student-form');
    const studentDetails = document.getElementById('student-details');
    
    // Create delete confirmation dialog
    const deleteDialog = document.createElement('div');
    deleteDialog.className = 'dialog-overlay';
    deleteDialog.innerHTML = `
        <div class="dialog-box">
            <h3>Delete Student</h3>
            <p>Are you sure you want to delete this student? This action cannot be undone.</p>
            <div class="dialog-buttons">
                <button class="dialog-btn cancel-btn">Cancel</button>
                <button class="dialog-btn confirm-btn">Delete</button>
            </div>
        </div>
    `;
    document.body.appendChild(deleteDialog);
    
    // Navigation Buttons
    const addStudentBtn = document.getElementById('add-student-btn');
    const backToListBtn = document.getElementById('back-to-list-btn');
    const backToListFromDetailsBtn = document.getElementById('back-to-list-from-details-btn');
    
    // Sample data - we'll use localStorage to persist data
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    // Navigation Functions
    function showScreen(screen) {
        studentListScreen.style.display = 'none';
        addStudentScreen.style.display = 'none';
        studentDetailsScreen.style.display = 'none';
        
        screen.style.display = 'block';
    }
    
    // Calculate percentage for a student
    function calculatePercentage(student) {
        const totalMarks = student.marathi + student.hindi + student.english + student.science + student.history;
        return (totalMarks / 500 * 100).toFixed(2);
    }
    
    // Sort students by percentage (descending)
    function sortStudentsByPercentage() {
        students.sort((a, b) => {
            const percentageA = parseFloat(calculatePercentage(a));
            const percentageB = parseFloat(calculatePercentage(b));
            return percentageB - percentageA;
        });
    }
    
    // Render the student list/leaderboard
    function renderStudentList() {
        sortStudentsByPercentage();
        studentList.innerHTML = '';
        
        students.forEach((student, index) => {
            const percentage = calculatePercentage(student);
            const rank = index + 1;
            
            const studentItem = document.createElement('div');
            studentItem.className = 'student-item';
            
            // Create main content div to hold student info
            const studentInfo = document.createElement('div');
            studentInfo.className = 'student-info';
            studentInfo.innerHTML = `
                <div class="rank ${rank <= 3 ? 'rank-' + rank : ''}">${rank}</div>
                <div class="student-name">${student.name}</div>
                <div class="percentage">${percentage}%</div>
            `;
            
            // Add click event to show student details
            studentInfo.addEventListener('click', () => {
                showStudentDetails(student, rank, percentage);
            });
            
            // Create action buttons container
            const actionButtons = document.createElement('div');
            actionButtons.className = 'action-buttons';
            
            // Create edit button
            const editButton = document.createElement('button');
            editButton.className = 'action-btn edit-btn';
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the parent click event
                editStudent(student, index);
            });
            
            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'action-btn delete-btn';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the parent click event
                showDeleteConfirmation(student, index);
            });
            
            // Add buttons to action container
            actionButtons.appendChild(editButton);
            actionButtons.appendChild(deleteButton);
            
            // Add all elements to student item
            studentItem.appendChild(studentInfo);
            studentItem.appendChild(actionButtons);
            
            studentList.appendChild(studentItem);
        });
        
        // Save to localStorage
        localStorage.setItem('students', JSON.stringify(students));
    }
    
    // Show student details
    function showStudentDetails(student, rank, percentage) {
        studentDetails.innerHTML = `
            <div class="student-profile">
                <div class="student-avatar">
                    ${student.name.charAt(0).toUpperCase()}
                </div>
                <h3>${student.name}</h3>
                <div class="student-rank">Rank: ${rank}</div>
                <div class="student-percentage">${percentage}%</div>
            </div>
            
            <div class="marks-container">
                <h4>Subject Marks</h4>
                <div class="subject-mark">
                    <div class="subject-name">Marathi</div>
                    <div class="subject-score">${student.marathi}/100</div>
                </div>
                <div class="subject-mark">
                    <div class="subject-name">Hindi</div>
                    <div class="subject-score">${student.hindi}/100</div>
                </div>
                <div class="subject-mark">
                    <div class="subject-name">English</div>
                    <div class="subject-score">${student.english}/100</div>
                </div>
                <div class="subject-mark">
                    <div class="subject-name">Science</div>
                    <div class="subject-score">${student.science}/100</div>
                </div>
                <div class="subject-mark">
                    <div class="subject-name">History</div>
                    <div class="subject-score">${student.history}/100</div>
                </div>
            </div>
        `;
        
        showScreen(studentDetailsScreen);
    }
    
    // Edit student function
    function editStudent(student, index) {
        // Set form title to Edit mode
        document.querySelector('#add-student-screen .screen-header h2').textContent = 'Edit Student Marks';
        
        // Fill form with student data
        document.getElementById('student-name').value = student.name;
        document.getElementById('marathi').value = student.marathi;
        document.getElementById('hindi').value = student.hindi;
        document.getElementById('english').value = student.english;
        document.getElementById('science').value = student.science;
        document.getElementById('history').value = student.history;
        
        // Store the index of the student being edited
        studentForm.dataset.editIndex = index;
        
        // Show the edit screen
        showScreen(addStudentScreen);
    }
    
    // Event Listeners
    addStudentBtn.addEventListener('click', () => {
        // Reset form title to Add mode
        document.querySelector('#add-student-screen .screen-header h2').textContent = 'Add Student Marks';
        
        // Clear any previous edit index
        delete studentForm.dataset.editIndex;
        
        // Reset form
        studentForm.reset();
        
        showScreen(addStudentScreen);
    });
    
    backToListBtn.addEventListener('click', () => {
        showScreen(studentListScreen);
    });
    
    backToListFromDetailsBtn.addEventListener('click', () => {
        showScreen(studentListScreen);
    });
    
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('student-name').value;
        const marathi = parseInt(document.getElementById('marathi').value);
        const hindi = parseInt(document.getElementById('hindi').value);
        const english = parseInt(document.getElementById('english').value);
        const science = parseInt(document.getElementById('science').value);
        const history = parseInt(document.getElementById('history').value);
        
        // Create student object
        const studentData = {
            name,
            marathi,
            hindi,
            english,
            science,
            history
        };
        
        // Check if we're editing or adding
        const editIndex = studentForm.dataset.editIndex;
        
        if (editIndex !== undefined) {
            // Update existing student
            students[editIndex] = studentData;
            // Clear edit index
            delete studentForm.dataset.editIndex;
        } else {
            // Add new student
            students.push(studentData);
        }
        
        // Reset form
        studentForm.reset();
        
        // Render updated list and go back to list screen
        renderStudentList();
        showScreen(studentListScreen);
    });
    
    // Initial render
    renderStudentList();
    
    // Show delete confirmation dialog
    function showDeleteConfirmation(student, index) {
        const deleteDialog = document.querySelector('.dialog-overlay');
        const confirmBtn = deleteDialog.querySelector('.confirm-btn');
        const cancelBtn = deleteDialog.querySelector('.cancel-btn');
        
        // Show the dialog
        deleteDialog.style.display = 'flex';
        
        // Set up the confirm button
        const confirmClickHandler = () => {
            // Remove the student
            students.splice(index, 1);
            
            // Update the list
            renderStudentList();
            
            // Hide the dialog
            deleteDialog.style.display = 'none';
            
            // Remove event listeners
            confirmBtn.removeEventListener('click', confirmClickHandler);
            cancelBtn.removeEventListener('click', cancelClickHandler);
        };
        
        // Set up the cancel button
        const cancelClickHandler = () => {
            // Just hide the dialog
            deleteDialog.style.display = 'none';
            
            // Remove event listeners
            confirmBtn.removeEventListener('click', confirmClickHandler);
            cancelBtn.removeEventListener('click', cancelClickHandler);
        };
        
        // Add event listeners
        confirmBtn.addEventListener('click', confirmClickHandler);
        cancelBtn.addEventListener('click', cancelClickHandler);
    }
    
    // If no students, add some sample data
    if (students.length === 0) {
        students = [
            {
                name: 'Rahul Sharma',
                marathi: 85,
                hindi: 92,
                english: 78,
                science: 95,
                history: 88
            },
            {
                name: 'Priya Patel',
                marathi: 92,
                hindi: 88,
                english: 95,
                science: 90,
                history: 85
            },
            {
                name: 'Amit Kumar',
                marathi: 75,
                hindi: 80,
                english: 85,
                science: 78,
                history: 82
            }
        ];
        renderStudentList();
    }
});