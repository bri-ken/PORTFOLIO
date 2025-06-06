import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: ['React', 'JavaScript', 'Tailwind', 'Node.js', 'HTML', 'CSS', 'Git', 'GitHub'],
  datasets: [
    {
      label: 'Skill Level',
      data: [9, 9, 10, 7, 10, 9, 8, 8],
      backgroundColor: 'rgba(59,130,246,0.2)',
      borderColor: 'rgba(59,130,246,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(168,85,247,1)',
    },
  ],
};

const options = {
  scale: {
    ticks: { beginAtZero: true, max: 10, stepSize: 2, color: '#fff' },
    pointLabels: { color: '#fff', font: { size: 14 } },
    grid: { color: '#444' },
    angleLines: { color: '#444' },
  },
  plugins: {
    legend: { labels: { color: '#fff' } },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const SkillsVisualizer = () => (
  <div className="bg-gray-900 rounded-lg p-6 shadow-lg w-full max-w-xl mx-auto">
    <h3 className="text-xl font-bold text-blue-400 mb-4 text-center">Tech Stack Visualizer</h3>
    <div className="h-80">
      <Radar data={data} options={options} />
    </div>
  </div>
);

export default SkillsVisualizer;
