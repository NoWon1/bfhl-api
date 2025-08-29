const { parseInput, createResponse } = require('./utils');


const fullName = 'aditya_mukherjee';  
const dob = '06052004';       
const email = 'adityamuk1@gmail.com'; 
const rollNumber = '22BCB0122'; 

const userId = `${fullName}_${dob}`;

function processData(req, res) {
  try {
    
    if (!req.body) {
      return res.status(400).json({ 
        is_success: false, 
        message: 'Request body is required' 
      });
    }

    if (!req.body.data) {
      return res.status(400).json({ 
        is_success: false, 
        message: 'data field is required' 
      });
    }

    if (!Array.isArray(req.body.data)) {
      return res.status(400).json({ 
        is_success: false, 
        message: 'data must be an array' 
      });
    }

    const { evenNumbers, oddNumbers, alphabets, specialChars, sumNum, concatStr } = parseInput(req.body.data);

    const response = createResponse(true, userId, email, rollNumber, evenNumbers, oddNumbers, alphabets, specialChars, sumNum, concatStr);

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ 
      is_success: false, 
      message: 'Internal server error' 
    });
  }
}

module.exports = { processData };
