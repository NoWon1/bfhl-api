import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <div className="ml-4">
        <p className="text-lg font-medium text-gray-900">Processing your data...</p>
        <p className="text-sm text-gray-500">This may take a few seconds</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
