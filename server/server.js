const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const cors = require('cors')
app.use(cors())

app.use(express.json());

let passwords = [];

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

app.get('/get-passwords', (req, res) => {
  console.log('Getting password')
  res.json(passwords);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
