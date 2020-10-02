const express = require('express');
const path = require('path');
const PORT = 3000;

app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
