import React from 'react';

export default function ScholarshipCard({ scholarship, onSelect }) {
  return (
    <article className="p-4 bg-white border rounded-xl hover:border-indigo-300 transition shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{scholarship.title}</h3>
          <p className="text-sm text-gray-500">
            {scholarship.provider} • <span className="text-orange-600">Deadline: {scholarship.deadline}</span>
          </p>
        </div>
        <button
          onClick={() => onSelect(scholarship)}
          className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100"
        >
          View Details
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{scholarship.description}</p>
    </article>
  );
}
