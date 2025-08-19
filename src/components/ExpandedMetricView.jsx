import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { mockFinancialHistory } from '../utils/mockData';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
export const ExpandedMetricView = ({
  title,
  value,
  format,
  metricKey,
  isGood,
  onClose
}) => {
  const [chartType, setChartType] = useState('area');
  // Format the value based on the format type
  const formattedValue = format === 'currency' ? `$${value.toLocaleString()}` : format === 'percentage' ? `${value}%` : format === 'ratio' ? value.toFixed(2) : value.toLocaleString();
  // Get reference value based on metric
  const getReferenceValue = () => {
    if (title === 'Debt to Equity') return 1.5;
    if (title === 'Current Ratio') return 1.0;
    if (title === 'Quick Ratio') return 1.0;
    if (title === 'Interest Coverage') return 2.5;
    return null;
  };
  const referenceValue = getReferenceValue();
  // Get color based on metric
  const getColor = () => {
    if (title === 'Debt to Equity') return '#ef4444';
    if (title === 'Current Ratio') return '#10b981';
    if (title === 'Quick Ratio') return '#3b82f6';
    if (title === 'Interest Coverage') return '#8b5cf6';
    return '#3b82f6';
  };
  const color = getColor();
  // Get information text based on metric
  const getInfoText = () => {
    if (title === 'Debt to Equity') {
      return "Debt to Equity ratio measures a company's financial leverage by comparing its total liabilities to shareholders' equity. A lower ratio indicates a more financially stable company with less risk.";
    }
    if (title === 'Current Ratio') {
      return "Current Ratio measures a company's ability to pay short-term obligations. A ratio above 1 indicates that the company can pay its short-term liabilities with its short-term assets.";
    }
    if (title === 'Quick Ratio') {
      return "Quick Ratio (Acid-test) measures a company's ability to meet short-term obligations with its most liquid assets. A ratio above 1 is generally considered good.";
    }
    if (title === 'Interest Coverage') {
      return "Interest Coverage Ratio measures a company's ability to pay interest on its outstanding debt. A higher ratio indicates better financial health.";
    }
    return "This metric helps assess the company's financial health and stability.";
  };
  const infoText = getInfoText();
  // Filter data for this metric
  const chartData = mockFinancialHistory.filter(item => item[metricKey] !== undefined);
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title} Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XIcon size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Current Value
              </h3>
              <div className="text-3xl font-bold">{formattedValue}</div>
              <p className="mt-2 text-sm text-gray-600">
                {value > (referenceValue || 0) ? isGood ? 'Above target (Good)' : 'Above target (Concern)' : isGood ? 'Below target (Concern)' : 'Below target (Good)'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Target Value
              </h3>
              <div className="text-3xl font-bold">
                {referenceValue || 'N/A'}
              </div>
              <p className="mt-2 text-sm text-gray-600">Industry benchmark</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <div className={`text-xl font-bold ${isGood ? 'text-green-600' : 'text-red-600'}`}>
                {isGood ? 'Healthy' : 'Needs Attention'}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Based on current trends
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Historical Performance</h3>
            <div className="flex space-x-2 mb-4">
              <button onClick={() => setChartType('area')} className={`px-3 py-1 text-sm rounded-md ${chartType === 'area' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Area
              </button>
              <button onClick={() => setChartType('line')} className={`px-3 py-1 text-sm rounded-md ${chartType === 'line' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Line
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'area' ? <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                    <XAxis dataKey="date" tick={{
                  fontSize: 12
                }} />
                    <YAxis tick={{
                  fontSize: 12
                }} />
                    <Tooltip contentStyle={{
                  borderRadius: '4px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                }} formatter={(value, name) => [value, title]} />
                    {referenceValue && <ReferenceLine y={referenceValue} stroke="#888" strokeDasharray="3 3" label={{
                  position: 'right',
                  value: `Target: ${referenceValue}`,
                  fill: '#888',
                  fontSize: 12
                }} />}
                    <Area type="monotone" dataKey={metricKey} stroke={color} fillOpacity={1} fill="url(#colorGradient)" strokeWidth={2} animationDuration={1000} dot={{
                  r: 3
                }} activeDot={{
                  r: 5,
                  stroke: color,
                  strokeWidth: 2
                }} />
                  </AreaChart> : <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                    <XAxis dataKey="date" tick={{
                  fontSize: 12
                }} />
                    <YAxis tick={{
                  fontSize: 12
                }} />
                    <Tooltip contentStyle={{
                  borderRadius: '4px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                }} formatter={(value, name) => [value, title]} />
                    {referenceValue && <ReferenceLine y={referenceValue} stroke="#888" strokeDasharray="3 3" label={{
                  position: 'right',
                  value: `Target: ${referenceValue}`,
                  fill: '#888',
                  fontSize: 12
                }} />}
                    <Line type="monotone" dataKey={metricKey} stroke={color} strokeWidth={2} dot={{
                  r: 3
                }} activeDot={{
                  r: 5
                }} animationDuration={1000} />
                  </LineChart>}
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2">About this Metric</h3>
            <p className="text-sm text-gray-700">{infoText}</p>
            {title === 'Debt to Equity' && <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded border border-green-100">
                  <span className="font-medium text-green-700">
                    Low (&lt; 1.0)
                  </span>
                  <p className="mt-1 text-gray-600">
                    Conservative financing with lower risk
                  </p>
                </div>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                  <span className="font-medium text-yellow-700">
                    Medium (1.0 - 1.5)
                  </span>
                  <p className="mt-1 text-gray-600">
                    Balanced financing approach
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-100">
                  <span className="font-medium text-red-700">
                    High (&gt; 1.5)
                  </span>
                  <p className="mt-1 text-gray-600">
                    Aggressive financing with higher risk
                  </p>
                </div>
              </div>}
          </div>
        </div>
        <div className="border-t p-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
            Close
          </button>
        </div>
      </div>
    </div>;
};