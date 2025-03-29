const express = require('express');
const cors = require('cors');
const app = express();

const {router} = require('./routers/index')
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api',router);

if (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview') {
    // Vercel will handle routing in serverless environments in production or preview
    module.exports = (req, res) => {
      app(req, res); // Delegate the request to Express handler
    };
  } else if (process.env.VERCEL_ENV === 'development') {
    // This is for local development when you're running the app using `vercel dev`
    const port = 4000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  }
