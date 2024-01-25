function generatePassword(length = 12) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';

    const allChars = uppercaseChars + lowercaseChars + numberChars + symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}

const generatePasswordButton = document.getElementById('generate-password');

// Add an event listener to the button
generatePasswordButton.addEventListener('click', () => {
    const generatedPassword = generatePassword();
    document.getElementById('password').value = generatedPassword;
});
