import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-2">
            Built for VIT Full-Stack Development Course
          </p>
          <p className="text-sm text-gray-500">
            API Endpoint: 
            <code className="bg-gray-100 px-2 py-1 rounded ml-2">
              https://bfhl-3qb1b7ot6-adis-projects-ed4cc149.vercel.app/bfhl
            </code>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
