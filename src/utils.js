function parseInput(data) {
  let evenNumbers = [];
  let oddNumbers = [];
  let alphabets = [];
  let specialChars = [];
  let sum = 0;
  let allAlphaChars = "";

  for (let item of data) {
    let strItem = item.toString();

    // Check if it's a pure number
    if (!isNaN(strItem) && strItem.trim() !== "" && /^\d+$/.test(strItem)) {
      let numVal = parseInt(strItem, 10);
      sum += numVal;
      if (numVal % 2 === 0) {
        evenNumbers.push(strItem);
      } else {
        oddNumbers.push(strItem);
      }
    } 
    // Check if it's purely alphabetic
    else if (/^[a-zA-Z]+$/.test(strItem)) {
      alphabets.push(strItem.toUpperCase());
      allAlphaChars += strItem;
    } 
    // Handle mixed strings or special characters
    else {
      let hasAlpha = false;
      for (let ch of strItem) {
        if (/^[a-zA-Z]$/.test(ch)) {
          if (!hasAlpha) {
            alphabets.push(strItem.toUpperCase());
            hasAlpha = true;
          }
          allAlphaChars += ch;
        } else if (!/^\d$/.test(ch)) {
          if (!specialChars.includes(ch)) {
            specialChars.push(ch);
          }
        }
      }
    }
  }

  // Create concatenated string with reverse order and alternating caps
  let reversedAlpha = allAlphaChars.split("").reverse();
  let concatString = "";
  for (let i = 0; i < reversedAlpha.length; i++) {
    concatString += (i % 2 === 0) ? reversedAlpha[i].toUpperCase() : reversedAlpha[i].toLowerCase();
  }

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
