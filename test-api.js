const testAPIEndpoint = async () => {
  console.log('Testing API endpoint...');
  
  const apiUrl = 'https://bfhl-a8db8bucz-adis-projects-ed4cc149.vercel.app/bfhl';
  const testData = ["a", "1", "334", "4", "R", "$"];
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ data: testData }),
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const result = await response.json();
    console.log('✅ API Test Successful!');
    console.log('Response:', result);
    return result;
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return null;
  }
};

// Also test GET request
const testGetEndpoint = async () => {
  console.log('Testing GET endpoint...');
  
  const apiUrl = 'https://bfhl-a8db8bucz-adis-projects-ed4cc149.vercel.app/bfhl';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const result = await response.json();
    console.log('✅ GET Test Successful!');
    console.log('Response:', result);
    return result;
  } catch (error) {
    console.error('❌ GET Test Failed:', error);
    return null;
  }
};

// Run tests
console.log('Starting API tests...');
testGetEndpoint();
testAPIEndpoint();
