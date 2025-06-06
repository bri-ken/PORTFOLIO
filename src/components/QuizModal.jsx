import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

const questions = [
  {
    question: "What is my favorite programming language?",
    options: ["JavaScript", "Python", "C++", "Java"],
    answer: 0
  },
  {
    question: "Which university do I attend?",
    options: ["UP Diliman", "Polytechnic University of the Philip4pines", "Ateneo University", "Univeristy of Santo Thomas"],
    answer: 1
  },
  {
    question: "What is my favorite hobby?",
    options: ["Gaming", "Cooking", "Photography", "Basketball"],
    answer: 0
  },
  {
    question: "What is my favorite anime?",
    options: ["Attack on Titan", "One Piece", "Naruto", "Demon Slayer"],
    answer: 1
  },
  {
    question: "What is my favorite color?",
    options: ["Blue", "Red", "Green", "Black"],
    answer: 3
  },
  {
    question: "Which game do I play the most?",
    options: ["Valorant", "Mobile Legends", "Genshin Impact", "Dota 2"],
    answer: 2
  },
  {
    question: "Which instrument do I play?",
    options: ["Piano", "Guitar", "Drums", "Violin"],
    answer: 1
  },
  {
    question: "What is my favorite food?",
    options: ["Bicol Express", "Sinigang", "Adobo", "Menudo"],
    answer: 0
  },
  {
    question: "Which social media do I use the most?",
    options: ["Facebook", "Instagram", "X (Twitter)", "TikTok"],
    answer: 3
  },
  {
    question: "What is my dream job?",
    options: ["Web Developer", "Doctor", "Pilot", "Chef"],
    answer: 0
  }
];

const QuizModal = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setSelected(null);
      setScore(0);
      setShowResult(false);
    }
  }, [open]);

  if (!open) return null;

  const handleOption = idx => {
    setSelected(idx);
  };
  const handleNext = () => {
    if (selected === questions[step].answer) setScore(score + 1);
    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };
  const handleRestart = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="relative z-10" onClick={handleModalClick} ref={modalRef}>
        <Card>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-blue-500 rounded-t-xl">
            <span className="font-mono text-blue-400 text-sm">Quiz: Get to know me better</span>
            <button onClick={onClose} className="text-gray-400 hover:text-red-400 text-lg font-bold">×</button>
          </div>
          <div className="p-6">
            {showResult ? (
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-blue-400">Quiz Complete!</div>
                <div className="mb-4 text-lg text-gray-200">Your score: {score} / {questions.length}</div>
                <button onClick={handleRestart} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Try Again</button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-lg font-mono text-gray-200">{questions[step].question}</div>
                <div className="space-y-2 mb-6">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOption(idx)}
                      className={`w-full text-left px-4 py-2 rounded transition font-mono border border-gray-700 ${
                        selected === idx ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-200 hover:bg-blue-900'
                      }`}
                      disabled={selected !== null}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={selected === null}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
                  >
                    {step === questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizModal;
