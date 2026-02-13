import React, { useState } from 'react';

export default function ChatBox({ onReply }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim()) {
      onReply(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input 
        value={text} 
        onChange={(e)=>setText(e.target.value)} 
        placeholder="Ask about eligibility or deadlines..." 
        className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
      />
      <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium">
        Ask AI
      </button>
    </form>
  );
}
