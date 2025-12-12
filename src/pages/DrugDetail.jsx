import React from 'react';
import { useParams } from 'react-router-dom';

const DrugDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">جزئیات دارو #{id}</h1>
        <p className="text-gray-600">صفحه جزئیات دارو در حال توسعه...</p>
      </div>
    </div>
  );
};

export default DrugDetail;