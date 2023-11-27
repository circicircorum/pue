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

app.listen(port, () => {
  console.log(`Pue listening on port ${port}...`)
})