const express = require('express');
const app = express();
const routes = require('./src/routes');
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Add root route for basic testing
app.get('/', (req, res) => {
  res.json({
    message: "BFHL API is running!",
    endpoints: {
      "POST /bfhl": "Main endpoint for data processing",
      "GET /bfhl": "Health check endpoint"
    }
  });
});

app.use('/bfhl', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/bfhl`);
});