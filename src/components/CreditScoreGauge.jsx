import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const CreditScoreGauge = ({ score }) => {
  // Risk level & color logic remains the same
  let riskLevel, color;
  if (score >= 800) {
    riskLevel = "Minimal Risk";
    color = "#10b981";
  } else if (score >= 670) {
    riskLevel = "Low Risk";
    color = "#60a5fa";
  } else if (score >= 580) {
    riskLevel = "Moderate Risk";
    color = "#f59e0b";
  } else if (score >= 480) {
    riskLevel = "High Risk";
    color = "#f97316";
  } else {
    riskLevel = "Severe Risk";
    color = "#ef4444";
  }

  // Reverted to the original progress calculation
  const scorePercentage = score / 850;
  const data = [
    { name: "Score", value: scorePercentage },
    { name: "Empty", value: 1 - scorePercentage },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-4">Credit Score</h2>

      {/* Gauge */}
      <div className="w-full h-52 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Reverted to the single-color progress Pie */}
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius="120%"
              outerRadius="140%"
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* --- CHANGED PART --- */}
        {/* Removed absolute positioning to allow parent flexbox to perfectly center the text */}
      </div>

      {/* Risk Info (Unchanged) */}
      <div className="text-center">
        <span className="text-lg font-medium" style={{ color }}>
          {riskLevel}
        </span>
        <p className="text-sm text-gray-500 mt-1">
          Based on financial performance and industry benchmarks
        </p>
      </div>

      {/* Extra text blocks (Unchanged) */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded-md shadow text-center">
          <p className="text-sm text-gray-500">EBITDA Change</p>
          <p className="text-base font-semibold text-green-600">+5.6%</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md shadow text-center">
          <p className="text-sm text-gray-500">Revenue Growth</p>
          <p className="text-base font-semibold text-blue-600">+8.2%</p>
        </div>
      </div>
    </div>
  );
};
