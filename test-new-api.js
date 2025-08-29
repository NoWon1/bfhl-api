const testAPI = async () => {
  const apiUrl = 'https://bfhl-3qb1b7ot6-adis-projects-ed4cc149.vercel.app/bfhl';
  
  console.log('Testing new API endpoint...');
  
  try {
    // Test GET request first
    console.log('1. Testing GET request...');
    const getResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log('GET Response Status:', getResponse.status);
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('GET Response:', getData);
    } else {
      console.log('GET Error:', await getResponse.text());
    }
    
    // Test POST request
    console.log('\n2. Testing POST request...');
    const testData = ["a", "1", "334", "4", "R", "$"];
    
    const postResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ data: testData })
    });
    
    console.log('POST Response Status:', postResponse.status);
    console.log('POST Response Headers:', Object.fromEntries(postResponse.headers.entries()));
    
    if (postResponse.ok) {
      const postData = await postResponse.json();
      console.log('POST Response:', postData);
      console.log('✅ API is working correctly!');
    } else {
      const errorText = await postResponse.text();
      console.log('POST Error:', errorText);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testAPI();
