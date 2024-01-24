const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express application
const app = express();

// Use middleware to parse JSON and handle CORS
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Enable CORS

// Sample in-memory database
const passwords = [
  { id: 1, website: 'facebook.com', username: 'olutoyekuti2k', password: 'Gb89@K_@3#786TFq' },
  { id: 2, website: 'login.yahoo.com', username: 'samedede123', password: '_#FgJ6c78MD$*^' }
];

// Route for saving passwords
app.post('/save-password', (req, res) => {
  console.log('Saving password')
    const { website, username, password } = req.body;

    if (!website || !username || !password) {
      res.json({ success: false, message: 'Invalid input. Please fill in all fields.' });
      return;
    }

    passwords.push({ website, username, password });
    res.json({ success: true, message: 'Password saved successfully.' });
});

// Route for retrieving passwords
app.get('/get-passwords', (req, res) => {
  console.log('Getting password')
  res.json(passwords);
});

// Route for updating passwords
app.post('/update-password', (req, res) => {
  const { passwordId, newPassword } = req.body;

  // Find the password in the array
  const passwordToUpdate = passwords.find(password => password.id === passwordId);

  if (passwordToUpdate) {
      // Update the password
      passwordToUpdate.password = newPassword;
      res.json({ message: 'Password updated successfully' });
  } else {
      res.status(404).json({ error: 'Password not found' });
  }
});

// Route for deleting passwords
app.post('/delete-password', (req, res) => {
  const { passwordId } = req.body;

  // Find the index of the password in the array
  const passwordIndex = passwords.findIndex(password => password.id === passwordId);

  if (passwordIndex !== -1) {
      // Delete the password
      passwords.splice(passwordIndex, 1);
      res.json({ message: 'Password deleted successfully' });
  } else {
      res.status(404).json({ error: 'Password not found' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
