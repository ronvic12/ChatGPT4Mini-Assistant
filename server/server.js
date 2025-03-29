const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const {router} = require('./routers/index')
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api',router);

if (process.env.VERCEL_ENV === 'production') {
    // Use this in production mode
    module.exports = (req, res) => {
      app(req, res); // Delegate the request to Express
    };
  } else if(process.env.VERCEL_ENV === 'development'){
    // Use this in development mode
    app.listen(port, () => console.log(`Server running on port ${port}`));
}  
