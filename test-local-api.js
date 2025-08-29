const testLocalAPI = async () => {
  const localApiUrl = 'http://localhost:3000/bfhl';
  
  console.log('Testing local API endpoint...');
  
  try {
    // Test POST request
    console.log('Testing POST request...');
    const testData = ["a", "1", "334", "4", "R", "$"];
    
    const response = await fetch(localApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ data: testData })
    });
    
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Response:', data);
      console.log('✅ Local API is working correctly!');
    } else {
      const errorText = await response.text();
      console.log('❌ Error:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

testLocalAPI();
