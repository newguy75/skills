const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 300;

app.get('/time', (req, res) => {
  res.json({ serverTime: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
