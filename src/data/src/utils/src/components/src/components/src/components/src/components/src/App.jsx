import React, { useState, useEffect } from "react";
import { sampleScholarships } from "./data/scholarships";
import { recommendScholarships, getChatbotReply } from "./utils/logic";
import ScholarshipCard from "./components/ScholarshipCard";
import ChatBox from "./components/ChatBox";
import ProfileModal from "./components/ProfileModal";
import DetailsModal from "./components/DetailsModal";

export default function App() {
  const [scholarships] = useState(sampleScholarships);
  const [query, setQuery] = useState("");
  
  // Profile State with LocalStorage
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem("profile_demo");
    return (stored && JSON.parse(stored)) || {
      course: "Bachelors",
      income: 300000,
      marks_percent: 75,
    };
  });
   
  const [recommendations, setRecommendations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("profile_demo", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    const recs = recommendScholarships(profile, scholarships);
    setRecommendations(recs);
  }, [profile, scholarships]);

  const filtered = scholarships.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.provider.toLowerCase().includes(q) ||
      s.tags.join(" ").toLowerCase().includes(q)
    );
  });

  const handleChatReply = (input) => {
    const response = getChatbotReply(input, profile, recommendations, scholarships);
    alert(response); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-indigo-900">AI Scholarship Finder</h1>
          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border">Demo Mode</div>
        </header>

        <section className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-indigo-500"
              />
              <button
                onClick={() => setShowProfileForm(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Profile
              </button>
            </div>
            <div className="space-y-3">
              {filtered.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} onSelect={setSelected} />
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-indigo-900 text-white rounded-xl p-5 shadow-lg">
              <h4 className="font-bold mb-3 flex items-center gap-2">✨ Top Matches</h4>
              <div className="space-y-3">
                {recommendations.length === 0 && <p className="text-xs opacity-70">Update profile for matches.</p>}
                {recommendations.map((r) => (
                  <div key={r.id} className="p-3 bg-white/10 rounded-lg border border-white/20">
                    <div className="font-medium text-sm">{r.title}</div>
                    <div className="text-xs opacity-70">Score: {r.score}/10</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-indigo-500">
          <h3 className="font-bold mb-3">AI Scholarship Assistant</h3>
          <ChatBox onReply={handleChatReply} />
        </section>
      </div>

      {showProfileForm && (
        <ProfileModal profile={profile} setProfile={setProfile} onClose={() => setShowProfileForm(false)} />
      )}

      {selected && (
        <DetailsModal scholarship={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
