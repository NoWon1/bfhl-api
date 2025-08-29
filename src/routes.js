const express = require('express');
const router = express.Router();
const { processData } = require('./controller');

// GET route for health check and testing
router.get('/', (req, res) => {
  res.status(200).json({
    message: "BFHL endpoint is working!",
    method: "POST",
    expected_format: {
      data: ["array", "of", "mixed", "values"]
    }
  });
});

// POST route for main functionality
router.post('/', processData);

module.exports = router;
