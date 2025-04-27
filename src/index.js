const express = require('express');
const dotenv = require('dotenv');
const { parseCSV } = require('./parser');
const { insertUsers } = require('./upload');
const { generateAgeDistributionReport } = require('./report');

dotenv.config();
const app = express();
const PORT = 3000;

app.get('/upload-csv', async (req, res) => {
  try {
    console.log('Starting CSV processing...');
    const users = await parseCSV(process.env.CSV_FILE_PATH);
    console.log(`Found ${users.length} records in CSV`);
    
    console.log('Uploading to database...');
    await insertUsers(users);
    
    console.log('Generating age distribution report...');
    await generateAgeDistributionReport();
    
    res.send('CSV uploaded and report generated! Check the server console for the age distribution report.');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Use this URL to process CSV: http://localhost:${PORT}/upload-csv`);
});