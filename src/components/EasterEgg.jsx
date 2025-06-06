import React, { useState, useEffect } from 'react';

const KONAMI = [38,38,40,40,37,39,37,39,66,65];

const EasterEgg = () => {
  const [activated, setActivated] = useState(false);
  const [input, setInput] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      setInput(prev => {
        const seq = [...prev, e.keyCode].slice(-KONAMI.length);
        if (seq.join() === KONAMI.join()) {
          setActivated(true);
        }
        return seq;
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!activated) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setActivated(false)}>
      <div className="bg-white rounded-lg p-8 shadow-2xl text-center max-w-xs mx-auto" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">🎉 Easter Egg! 🎮</h2>
        <p className="mb-4 text-gray-800">You found the secret Konami code!<br/>Here’s a mini-game: click the button as fast as you can!</p>
        <MiniGame />
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setActivated(false)}>Close</button>
      </div>
    </div>
  );
};

function MiniGame() {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setRunning(false);
    }
    return () => clearInterval(interval);
  }, [running, timer]);

  const start = () => {
    setScore(0);
    setTimer(10);
    setRunning(true);
  };

  return (
    <div>
      <div className="mb-2 text-lg">Time: {timer}s</div>
      <div className="mb-2 text-lg">Score: {score}</div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        onClick={() => running && setScore(s => s + 1)}
        disabled={!running}
      >
        Click Me!
      </button>
      {!running && (
        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={start}>
          Start
        </button>
      )}
    </div>
  );
}

export default EasterEgg;
