import React, { useState, useRef } from 'react';

const botResponses = [
  { q: /name|who/i, a: "I'm Kenneth's AI assistant!" },
  { q: /skills?|tech|stack/i, a: "Kenneth is skilled in React, JavaScript, Tailwind CSS, Node.js, and more." },
  { q: /hobby|interest/i, a: "Kenneth loves gaming, music, and photography." },
  { q: /school|university/i, a: "He studies at Polytechnic University of the Philippines." },
  { q: /anime/i, a: "His favorite anime is One Piece!" },
  { q: /color/i, a: "Kenneth's favorite color is blue." },
  { q: /game/i, a: "He enjoys playing Valorant." },
  { q: /food/i, a: "Adobo is his favorite food." },
  { q: /dream job/i, a: "He dreams of being a Web Developer." },
  { q: /.*/, a: "Ask me anything about Kenneth!" }
];

function getBotReply(input) {
  const found = botResponses.find(r => r.q.test(input));
  return found ? found.a : botResponses[botResponses.length - 1].a;
}

const ChatBot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m your AI assistant. Ask me anything about Kenneth.' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setTyping(true);
    const reply = getBotReply(input);
    setInput('');
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: reply }]);
      setTyping(false);
    }, 900 + Math.random() * 800);
  };

  React.useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, typing]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/40" onClick={onClose}>
      <div className="relative z-10 w-full max-w-xs m-4" onClick={e => e.stopPropagation()}>
        <div className="bg-gray-900 rounded-xl shadow-2xl border border-blue-500 flex flex-col h-96">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-blue-500 rounded-t-xl">
            <span className="font-mono text-blue-400 text-sm">AI ChatBot</span>
            <button onClick={onClose} className="text-gray-400 hover:text-red-400 text-lg font-bold">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.from === 'bot' ? 'bg-blue-800 text-white' : 'bg-blue-500 text-white'}`}>{msg.text}</div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start"><div className="px-3 py-2 rounded-lg bg-blue-800 text-white text-sm animate-pulse">Typing...</div></div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={sendMessage} className="flex p-2 border-t border-blue-500 bg-gray-800 rounded-b-xl">
            <input
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l focus:outline-none"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about Kenneth..."
              autoFocus
            />
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded-r text-white font-bold hover:bg-blue-600">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
