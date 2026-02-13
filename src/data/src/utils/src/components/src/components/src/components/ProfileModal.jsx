import React from 'react';

export default function ProfileModal({ profile, setProfile, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h4 className="text-xl font-bold mb-4">Your Academic Profile</h4>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Current Course</label>
            <select 
               value={profile.course} 
               onChange={(e)=>setProfile({...profile, course: e.target.value})} 
               className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option>Bachelors</option>
              <option>Masters</option>
              <option>PhD</option>
              <option>Certificate</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Annual Household Income</label>
            <input 
              type="number" 
              value={profile.income} 
              onChange={(e)=>setProfile({...profile, income: Number(e.target.value)})} 
              className="w-full border rounded-lg px-3 py-2 mt-1" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Academic Performance (%)</label>
            <input 
              type="number" 
              value={profile.marks_percent} 
              onChange={(e)=>setProfile({...profile, marks_percent: Number(e.target.value)})} 
              className="w-full border rounded-lg px-3 py-2 mt-1" 
            />
          </div>
          <button 
            onClick={onClose} 
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition"
          >
            Save & Update Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
