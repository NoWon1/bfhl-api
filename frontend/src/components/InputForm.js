import React, { useState } from 'react';
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const InputForm = ({ onSubmit, onReset, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputMethod, setInputMethod] = useState('manual');

  const sampleData = {
    example1: '["a","1","334","4","R", "$"]',
    example2: '["2","a", "y", "4", "&", "-", "*", "5","92","b"]',
    example3: '["A","ABcD","DOE"]'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      alert('Please enter some data');
      return;
    }

    try {
      // Clean the input value
      const cleanedInput = inputValue.trim();
      console.log('Parsing input:', cleanedInput);
      
      const parsedData = JSON.parse(cleanedInput);
      console.log('Parsed data:', parsedData);
      
      if (!Array.isArray(parsedData)) {
        throw new Error('Input must be an array');
      }

      if (parsedData.length === 0) {
        throw new Error('Array cannot be empty');
      }

      onSubmit(parsedData);
    } catch (error) {
      console.error('JSON Parse error:', error);
      alert(`Invalid JSON format: ${error.message}\n\nPlease enter a valid JSON array like: ["a", "1", "334", "4", "R", "$"]`);
    }
  };

  const loadSample = (sample) => {
    setInputValue(sample);
    setInputMethod('manual'); // Switch to manual input to show the loaded sample
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Data</h2>
      
      {/* Input Method Toggle */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setInputMethod('manual')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              inputMethod === 'manual'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Manual Input
          </button>
          <button
            onClick={() => setInputMethod('samples')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              inputMethod === 'samples'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sample Data
          </button>
        </div>
      </div>

      {inputMethod === 'samples' && (
        <div className="mb-6 space-y-3">
          <h3 className="text-lg font-medium text-gray-900">Choose Sample Data:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => loadSample(sampleData.example1)}
              className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">Example A</div>
              <div className="text-xs text-gray-500 mt-1">Mixed data with numbers, letters, symbols</div>
              <div className="text-xs text-blue-600 mt-1 font-mono">{sampleData.example1}</div>
            </button>
            <button
              onClick={() => loadSample(sampleData.example2)}
              className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">Example B</div>
              <div className="text-xs text-gray-500 mt-1">Complex array with special characters</div>
              <div className="text-xs text-blue-600 mt-1 font-mono">{sampleData.example2}</div>
            </button>
            <button
              onClick={() => loadSample(sampleData.example3)}
              className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">Example C</div>
              <div className="text-xs text-gray-500 mt-1">Alphabetic strings only</div>
              <div className="text-xs text-blue-600 mt-1 font-mono">{sampleData.example3}</div>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="input-data" className="block text-sm font-medium text-gray-700 mb-2">
            Enter JSON Array:
          </label>
          <textarea
            id="input-data"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter data as JSON array, e.g., ["a","1","334","4","R", "$"]'
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Format: JSON array of strings/numbers, e.g., ["a", "1", "334", "4", "R", "$"]
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            <span>{loading ? 'Processing...' : 'Process Data'}</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setInputValue('');
              onReset();
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <ArrowPathIcon className="h-5 w-5" />
            <span>Reset</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
