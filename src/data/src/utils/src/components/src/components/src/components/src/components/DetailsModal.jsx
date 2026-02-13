import React from 'react';

export default function DetailsModal({ scholarship, onClose }) {
  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative">
        <h3 className="text-2xl font-bold text-gray-900">{scholarship.title}</h3>
        <p className="text-indigo-600 font-medium mb-4">{scholarship.provider}</p>
        <div className="prose text-gray-600 mb-6">
          {scholarship.description}
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {scholarship.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">#{tag}</span>
          ))}
        </div>
        <div className="flex gap-3">
          <a 
            href={scholarship.apply_link} 
            target="_blank" 
            rel="noreferrer" 
            className="flex-1 text-center py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Apply Now
          </a>
          <button 
            onClick={onClose} 
            className="px-6 py-3 border border-gray-300 rounded-lg font-bold hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
