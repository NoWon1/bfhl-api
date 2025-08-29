import React from 'react';
import { 
  CheckCircleIcon, 
  UserIcon, 
  EnvelopeIcon, 
  AcademicCapIcon,
  CalculatorIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

const ResultDisplay = ({ result }) => {
  const InfoCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 truncate">{value}</p>
        </div>
      </div>
    </div>
  );

  const ArrayCard = ({ title, items, emptyMessage, color = 'gray' }) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {items && items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${color}-100 text-${color}-800`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">{emptyMessage}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Success Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
          <div>
            <h3 className="text-lg font-medium text-green-900">Processing Complete!</h3>
            <p className="text-sm text-green-700">Your data has been successfully processed.</p>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard 
            title="User ID" 
            value={result.user_id} 
            icon={UserIcon}
            color="blue"
          />
          <InfoCard 
            title="Email" 
            value={result.email} 
            icon={EnvelopeIcon}
            color="green"
          />
          <InfoCard 
            title="Roll Number" 
            value={result.roll_number} 
            icon={AcademicCapIcon}
            color="purple"
          />
          <InfoCard 
            title="Sum of Numbers" 
            value={result.sum} 
            icon={CalculatorIcon}
            color="orange"
          />
        </div>
      </div>

      {/* Processed Data */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Processed Data</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ArrayCard
            title="Even Numbers"
            items={result.even_numbers}
            emptyMessage="No even numbers found"
            color="blue"
          />
          <ArrayCard
            title="Odd Numbers"
            items={result.odd_numbers}
            emptyMessage="No odd numbers found"
            color="red"
          />
          <ArrayCard
            title="Alphabets (Uppercase)"
            items={result.alphabets}
            emptyMessage="No alphabets found"
            color="green"
          />
          <ArrayCard
            title="Special Characters"
            items={result.special_characters}
            emptyMessage="No special characters found"
            color="purple"
          />
        </div>
      </div>

      {/* Concatenated String */}
      {result.concat_string && (
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">String Concatenation</h2>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-start space-x-3">
              <LinkIcon className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Alphabets in reverse order with alternating caps:
                </p>
                <code className="text-lg font-mono bg-white px-3 py-2 rounded border">
                  {result.concat_string}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Raw JSON Response */}
      <details className="card">
        <summary className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-primary-600">
          View Raw JSON Response
        </summary>
        <pre className="mt-4 bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default ResultDisplay;
