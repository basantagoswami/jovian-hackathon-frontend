// server.js

const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Render the home page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle the form submission
app.post('/schedule', async (req, res) => {
  try {
    const { city, startDate, endDate } = req.body;

    // Add your OpenAI API key as an authorization header
    const headers = {
      'Authorization': 'Bearer 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'
    };

    // Make a request to the OpenAI API using Axios
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Create a travel schedule for ${city} from ${startDate} to ${endDate}.`,
      max_tokens: 100,
      temperature: 0.7
    }, { headers });

    console.log(response.data.error);
    const schedule = response.data.choices[0].text;

    // Render the schedule page with the generated travel schedule
    res.render('schedule', { city, startDate, endDate, schedule });
  } catch (error) {
    console.error('Error:', error);
    res.render('error'); // Render the error page
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
