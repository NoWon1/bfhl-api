function parseInput(data) {
  let evenNumbers = [];
  let oddNumbers = [];
  let alphabets = [];
  let specialChars = [];
  let sum = 0;
  let allAlphaChars = "";

  console.log('Processing data:', data); // Debug log

  for (let item of data) {
    let strItem = item.toString();

    // Check if it's a pure number
    if (!isNaN(strItem) && strItem.trim() !== "" && /^\d+$/.test(strItem.trim())) {
      let numVal = parseInt(strItem, 10);
      sum += numVal;
      if (numVal % 2 === 0) {
        evenNumbers.push(strItem);
      } else {
        oddNumbers.push(strItem);
      }
    } 
    // Check if it's purely alphabetic (single chars or strings)
    else if (/^[a-zA-Z]+$/.test(strItem)) {
      alphabets.push(strItem.toUpperCase());
      allAlphaChars += strItem;
    } 
    // Handle mixed content or special characters
    else {
      let hasNumbers = /\d/.test(strItem);
      let hasAlpha = /[a-zA-Z]/.test(strItem);
      
      if (hasNumbers && !hasAlpha) {
        // Contains only numbers and special chars
        let nums = strItem.match(/\d+/g);
        if (nums) {
          for (let num of nums) {
            let numVal = parseInt(num, 10);
            sum += numVal;
            if (numVal % 2 === 0) {
              evenNumbers.push(num);
            } else {
              oddNumbers.push(num);
            }
          }
        }
        let specialCharsInItem = strItem.match(/[^\d]/g);
        if (specialCharsInItem) {
          specialChars.push(...specialCharsInItem);
        }
      } else if (hasAlpha && !hasNumbers) {
        // Contains only letters and special chars
        alphabets.push(strItem.toUpperCase());
        let alphaChars = strItem.match(/[a-zA-Z]/g);
        if (alphaChars) {
          allAlphaChars += alphaChars.join('');
        }
        let specialCharsInItem = strItem.match(/[^a-zA-Z]/g);
        if (specialCharsInItem) {
          specialChars.push(...specialCharsInItem);
        }
      } else {
        // Mixed content
        if (hasAlpha) {
          alphabets.push(strItem.toUpperCase());
          let alphaChars = strItem.match(/[a-zA-Z]/g);
          if (alphaChars) {
            allAlphaChars += alphaChars.join('');
          }
        }
        
        let nums = strItem.match(/\d+/g);
        if (nums) {
          for (let num of nums) {
            let numVal = parseInt(num, 10);
            sum += numVal;
            if (numVal % 2 === 0) {
              evenNumbers.push(num);
            } else {
              oddNumbers.push(num);
            }
          }
        }
        
        let specialCharsInItem = strItem.match(/[^\da-zA-Z]/g);
        if (specialCharsInItem) {
          specialChars.push(...specialCharsInItem);
        }
      }
    }
  }

  // Remove duplicates from special characters
  specialChars = [...new Set(specialChars)];

  // Create concatenated string with reverse order and alternating caps
  let reversedAlpha = allAlphaChars.split("").reverse();
  let concatString = "";
  for (let i = 0; i < reversedAlpha.length; i++) {
    concatString += (i % 2 === 0) ? reversedAlpha[i].toUpperCase() : reversedAlpha[i].toLowerCase();
  }

  console.log('Processed result:', {
    evenNumbers,
    oddNumbers,
    alphabets,
    specialChars,
    sum: sum.toString(),
    concatString
  }); // Debug log

  return {
    evenNumbers,
    oddNumbers,
    alphabets,
    specialChars,
    sumNum: sum.toString(),
    concatStr: concatString
  };
}

function createResponse(isSuccess, userId, email, rollNumber, evenNumbers, oddNumbers, alphabets, specialChars, sumStr, concatStr) {
  return {
    is_success: isSuccess,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    even_numbers: evenNumbers,
    odd_numbers: oddNumbers,
    alphabets: alphabets,
    special_characters: specialChars,
    sum: sumStr,
    concat_string: concatStr
  };
}

module.exports = { parseInput, createResponse };
