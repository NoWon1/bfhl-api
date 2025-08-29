const express = require('express');
const app = express();
const routes = require('./src/routes');
const PORT = process.env.PORT || 3000;

// Enhanced CORS middleware - CRITICAL FIX
app.use((req, res, next) => {
  // Allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');
  
  // Allow these methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  
  // Allow these headers
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  
  // Allow credentials
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Set cache control for preflight requests
  res.header('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests immediately
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }
  
  console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Add root route for testing
app.get('/', (req, res) => {
  res.json({
    message: "BFHL API is running!",
    timestamp: new Date().toISOString(),
    endpoints: {
      "POST /bfhl": "Main endpoint for data processing",
      "GET /bfhl": "Health check endpoint"
    },
    cors: "enabled",
    status: "healthy"
  });
});

// Use the routes
app.use('/bfhl', routes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    is_success: false,
    message: 'Internal server error',
    error: error.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
