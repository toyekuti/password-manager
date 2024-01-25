// Front-end logic

function savePassword() {
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validation
    if (!website || !username || !isValidPassword(password)) {
        alert("Please fill in all fields with a valid password.");
        return;
    }

    // Make a POST request to the server to save the password
    axios.post('http://localhost:3000/save-password', { website, username, password })
        .then(response => {
            alert(response.data.message);
            getPasswords(); // Call getPasswords after saving
        })
        .catch(error => console.error('Error saving password:', error));
}

function isValidPassword(password) {
    // Password must be at least 10 characters long
    // Includes at least one number
    // Includes at least one uppercase letter
    // Includes at least one lowercase letter
    // Includes at least one symbol
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@&!#_*]).{10,}$/;
    return passwordRegex.test(password);
}

function getPasswords() {
    // Make a GET request to the server to get all saved passwords
    axios.get('http://localhost:3000/get-passwords')
        .then(response => displayPasswords(response.data))
        .catch(error => console.error('Error getting passwords:', error));
}

function updatePassword(passwordId, newPassword) {
    // Make a POST request to the server to update the password
    axios.post('http://localhost:3000/update-password', { passwordId, newPassword })
        .then(response => {
            console.log('Password updated successfully:', response);
            alert(response.data.message);
            getPasswords(); // Refresh the password list after updating
        })
        .catch(error => console.error('Error updating password:', error));
}

function deletePassword(passwordId) {
    // Make a POST request to the server to delete the password
    axios.post('http://localhost:3000/delete-password', { passwordId })
        .then(response => {
            console.log('Password deleted successfully:', response);
            alert(response.data.message);
            getPasswords(); // Refresh the password list after deletion
        })
        .catch(error => console.error('Error deleting password:', error));
}

function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}

function displayPasswords(passwords) {
    const passwordListDiv = document.getElementById("passwordList");
    passwordListDiv.innerHTML = '';

    passwords.forEach(password => {
        const passwordDiv = document.createElement('div');
        passwordDiv.innerHTML = `
        <strong>${password.website}</strong> - ${password.username} - 
        <span class="hidden-password" style="display: none;">${password.password}</span>
        <span class="reveal-icon">👁️</span>`;

        // Toggle password visibility on reveal icon click
        const revealIcon = passwordDiv.querySelector('.reveal-icon');
        const hiddenPassword = passwordDiv.querySelector('.hidden-password');

        revealIcon.addEventListener('click', () => {
            hiddenPassword.style.display = hiddenPassword.style.display === 'none' ? 'inline' : 'none';
        });

        // Button for update
        const updateButton = createButton('Update', () => {
            const newPassword = prompt('Enter the new password:');
            if (newPassword) {
                updatePassword(password.id, newPassword);
            }
        });

        // Button for delete
        const deleteButton = createButton('Delete', () => {
            const confirmDelete = confirm('Are you sure you want to delete this password?');
            if (confirmDelete) {
                deletePassword(password.id);
            }
        });

        passwordDiv.appendChild(updateButton);
        passwordDiv.appendChild(deleteButton);
        passwordListDiv.appendChild(passwordDiv);
    });
}

// Initial load of passwords
getPasswords();
