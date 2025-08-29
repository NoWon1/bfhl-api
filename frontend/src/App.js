import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

// UPDATED API URL - Make sure this matches your deployed backend
const API_URL = 'https://bfhl-3qb1b7ot6-adis-projects-ed4cc149.vercel.app/bfhl';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (inputData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Sending request to:', API_URL);
      console.log('Request data:', { data: inputData });

      // First attempt with full fetch configuration
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-cache'
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText || errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!data.is_success) {
        throw new Error(data.message || 'Server returned unsuccessful response');
      }

      setResult(data);
    } catch (err) {
      console.error('Fetch error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      
      let errorMessage = 'Failed to fetch data from server';
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Network error: Unable to connect to the API. Please check your internet connection.';
      } else if (err.message.includes('CORS')) {
        errorMessage = 'CORS error: The API is not allowing requests from this domain.';
      } else if (err.message.includes('401')) {
        errorMessage = 'Authentication error: The API requires authentication.';
      } else if (err.message.includes('500')) {
        errorMessage = 'Server error: The API is experiencing internal issues.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              BFHL Data Processor
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter an array of mixed data and get organized results with numbers, 
              alphabets, special characters, and more!
            </p>
          </div>

          {/* API Status */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">API Endpoint:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{API_URL}</code>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ● Connected
              </span>
            </div>
          </div>

          {/* Input Form */}
          <InputForm onSubmit={handleSubmit} onReset={handleReset} loading={loading} />

          {/* Loading Spinner */}
          {loading && <LoadingSpinner />}

          {/* Error Message */}
          {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

          {/* Results */}
          {result && <ResultDisplay result={result} />}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
