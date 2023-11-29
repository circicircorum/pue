const express = require('express')
const fs = require('fs')
const app = express()
// const port = 4000


// Misc init stuffs
const args = process.argv.slice(2); // Get command-line arguments
const port = args[0] || 3000; // Use the first argument as the port or default to 3005
app.use(express.static('public')); // Serve static files from the 'public' directory
let nReq = 0;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Assume 'remote_data.csv' is in the same directory as index.js
app.get('/gxb_remote_data', (req, res) => {
  fs.readFile('public/gxb/remote_data.csv', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error loading data from server');
      } else {
          res.send(data);
      }
  });
});

app.post('/gxb_remote_data', express.text(), (req, res) => {
  const data = req.body; // Assuming you're sending data in the request body
  console.log(req.body);
  
  fs.writeFile('public/gxb/remote_data.csv', `${data}\n`, (err) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error saving data to remote_data.csv');
      } else {
          res.send('Data saved successfully!');
      }
  });
});

app.listen(port, () => {
  console.log(`Pue listening on port ${port}...`)
})