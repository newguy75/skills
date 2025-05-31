const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.get('/file', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'example.txt');
  res.sendFile(filePath, err => {
    if (err) {
      res.status(500).send('File not found or cannot be sent.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
