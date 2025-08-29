const testNewDeployment = async () => {
  const apiUrl = 'https://bfhl-m1wk11vk3-adis-projects-ed4cc149.vercel.app/bfhl';
  
  console.log('Testing new deployment...');
  
  try {
    const testData = ["a", "1", "334", "4", "R", "$"];
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ data: testData })
    });
    
    console.log('Response Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Response:', data);
      console.log('✅ New deployment is working!');
    } else {
      const errorText = await response.text();
      console.log('❌ Error Response:', response.status, errorText.substring(0, 500));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testNewDeployment();
