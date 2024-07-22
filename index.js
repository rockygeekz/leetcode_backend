// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./conn');
const Authrouter = require('./routes/Authrouter');
const Roastrouter = require('./routes/roastRouter');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use('/auth', Authrouter);
app.use('/roast', Roastrouter);

app.get('/hi', (req, res) => {
    res.send('hello');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
