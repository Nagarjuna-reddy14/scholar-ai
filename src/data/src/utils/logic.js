// Calculate days until deadline
export function daysUntil(dateString) {
  const today = new Date();
  const d = new Date(dateString + "T23:59:59");
  const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
  return isNaN(diff) ? 0 : diff;
}

// Recommendation Engine
export function recommendScholarships(user, list) {
  const scored = list.map((s) => {
    let score = 0;
    // Basic Matching Rules
    if (s.eligible_courses.includes(user.course)) score += 5;
    if (user.income <= s.income_limit) score += 4;
    if (user.marks_percent >= 85 && s.tags.includes("merit")) score += 3;
    if (s.tags.includes("stem") && user.course.toLowerCase().includes("bachelor")) score += 2;
    
    // Urgency Boost
    const daysLeft = daysUntil(s.deadline);
    if (daysLeft > 0 && daysLeft < 30) score += 1; 
    
    return { ...s, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// Chatbot Logic
export function getChatbotReply(input, profile, recommendations, scholarships) {
  const text = input.toLowerCase();
  
  if (text.includes("eligible") || text.includes("recommend")) {
    return `Based on your profile (Course: ${profile.course}, Income: $${profile.income}), I found ${recommendations.length} strong matches. Check the sidebar for details!`;
  }
  
  if (text.includes("deadline") || text.includes("date")) {
    const soon = [...scholarships]
      .map((s) => ({ ...s, days: daysUntil(s.deadline) }))
      .filter((s) => s.days > 0)
      .sort((a, b) => a.days - b.days)
      .slice(0, 2);
    
    return `Upcoming Deadlines: ${soon.map((s) => `${s.title} (${s.days} days left)`).join(", ")}`;
  }
  
  return "I can help! Try asking: 'Which scholarships am I eligible for?' or 'Any upcoming deadlines?'";
}
