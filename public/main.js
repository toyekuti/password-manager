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

function displayPasswords(passwords) {
    const passwordListDiv = document.getElementById("passwordList");
    passwordListDiv.innerHTML = '';

    passwords.forEach(password => {
        const passwordDiv = document.createElement('div');
        passwordDiv.innerHTML = `<strong>${password.website}</strong> - ${password.username} - ${password.password}`;
        passwordListDiv.appendChild(passwordDiv);
    });
}

const button = document.querySelector('#save-password');
button.addEventListener("click", savePassword);

// Initial load of passwords
getPasswords();
