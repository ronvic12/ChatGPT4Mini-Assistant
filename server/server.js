const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const {router} = require('./routers/index')
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
    console.log("Running from Node.js Backends");
    //res.json({ message: "Hello from Node.js backend!" });
});


app.use('/api',router);
app.listen(port, () => console.log(`Server running on port ${port}`));