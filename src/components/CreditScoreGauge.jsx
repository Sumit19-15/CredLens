import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

export const CreditScoreGauge = ({ score }) => {
  // Determine risk level and color
  let riskLevel;
  let color;

  if (score >= 800) {
    riskLevel = "Minimal Risk";
    color = "#10b981"; // green
  } else if (score >= 670) {
    riskLevel = "Low Risk";
    color = "#60a5fa"; // blue
  } else if (score >= 580) {
    riskLevel = "Moderate Risk";
    color = "#f59e0b"; // amber
  } else if (score >= 480) {
    riskLevel = "High Risk";
    color = "#f97316"; // orange
  } else {
    riskLevel = "Severe Risk";
    color = "#ef4444"; // red
  }

  // Gauge chart data
  const scorePercentage = score / 850;
  const data = [
    { name: "Score", value: scorePercentage },
    { name: "Empty", value: 1 - scorePercentage },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h2 className="text-lg font-semibold mb-2">Credit Score</h2>

      <div className="flex flex-col items-center">
        {/* Gauge Chart */}
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={0}
                dataKey="value"
              >
                <Cell key="cell-0" fill={color} />
                <Cell key="cell-1" fill="#e5e7eb" />

                {/* Custom label inside gauge */}
                <Label
                  content={({ viewBox }) => {
                    const { cx, cy } = viewBox;
                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 10}
                          textAnchor="middle"
                          className="text-3xl font-bold"
                          fill="#111827"
                        >
                          {score}
                        </text>
                        <text
                          x={cx}
                          y={cy + 20}
                          textAnchor="middle"
                          className="text-sm"
                          fill="#4b5563"
                        >
                          out of 850
                        </text>
                      </g>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Level Display */}
        <div className="mt-4 text-center">
          <span className="text-lg font-medium" style={{ color }}>
            {riskLevel}
          </span>
          <p className="text-sm text-gray-500 mt-1">
            Based on financial performance and industry benchmarks
          </p>
        </div>
      </div>
    </div>
  );
};
