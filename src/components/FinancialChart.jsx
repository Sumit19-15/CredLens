import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart, ReferenceLine, ReferenceArea } from 'recharts';
export const FinancialChart = ({
  data
}) => {
  const [chartType, setChartType] = useState('area');
  const [metric, setMetric] = useState('creditScore');
  const [secondaryMetric, setSecondaryMetric] = useState('');
  const metricOptions = [{
    value: 'creditScore',
    label: 'Credit Score'
  }, {
    value: 'debtToEquity',
    label: 'Debt to Equity'
  }, {
    value: 'currentRatio',
    label: 'Current Ratio'
  }, {
    value: 'revenue',
    label: 'Revenue (millions)'
  }];
  // Determine color based on metric
  const getLineColor = metricName => {
    switch (metricName) {
      case 'creditScore':
        return '#3b82f6';
      // blue
      case 'debtToEquity':
        return '#ef4444';
      // red
      case 'currentRatio':
        return '#10b981';
      // green
      case 'revenue':
        return '#8b5cf6';
      // purple
      default:
        return '#3b82f6';
      // default blue
    }
  };
  // Get reference value for selected metric (for reference line)
  const getReferenceValue = metricName => {
    switch (metricName) {
      case 'creditScore':
        return 670;
      // threshold for "good" credit score
      case 'debtToEquity':
        return 1.5;
      // threshold for healthy debt to equity
      case 'currentRatio':
        return 1.0;
      // threshold for healthy current ratio
      default:
        return null;
    }
  };
  const referenceValue = getReferenceValue(metric);
  // Calculate min and max for the selected metric to set appropriate chart domain
  const metricValues = data.map(item => item[metric]);
  const minValue = Math.min(...metricValues) * 0.9;
  const maxValue = Math.max(...metricValues) * 1.1;
  return <div>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex space-x-2">
          <button onClick={() => setChartType('area')} className={`px-3 py-1 text-sm rounded-md ${chartType === 'area' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Area
          </button>
          <button onClick={() => setChartType('line')} className={`px-3 py-1 text-sm rounded-md ${chartType === 'line' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Line
          </button>
          <button onClick={() => setChartType('bar')} className={`px-3 py-1 text-sm rounded-md ${chartType === 'bar' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Bar
          </button>
          <button onClick={() => setChartType('composed')} className={`px-3 py-1 text-sm rounded-md ${chartType === 'composed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Composed
          </button>
        </div>
        <div className="flex space-x-2">
          <div>
            <select value={metric} onChange={e => setMetric(e.target.value)} className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Primary Metric</option>
              {metricOptions.map(option => <option key={option.value} value={option.value}>
                  {option.label}
                </option>)}
            </select>
          </div>
          {chartType === 'composed' && <div>
              <select value={secondaryMetric} onChange={e => setSecondaryMetric(e.target.value)} className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Secondary Metric (Optional)</option>
                {metricOptions.filter(option => option.value !== metric).map(option => <option key={option.value} value={option.value}>
                      {option.label}
                    </option>)}
              </select>
            </div>}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? <AreaChart data={data}>
              <defs>
                <linearGradient id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getLineColor(metric)} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={getLineColor(metric)} stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
              <XAxis dataKey="date" tick={{
            fontSize: 12
          }} />
              <YAxis tick={{
            fontSize: 12
          }} domain={[minValue, maxValue]} />
              <Tooltip contentStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
          }} formatter={(value, name) => [value, metricOptions.find(opt => opt.value === name)?.label || name]} />
              <Legend />
              {referenceValue && <ReferenceLine y={referenceValue} stroke="#888" strokeDasharray="3 3" label={{
            position: 'right',
            value: `Target: ${referenceValue}`,
            fill: '#888',
            fontSize: 12
          }} />}
              <Area type="monotone" dataKey={metric} stroke={getLineColor(metric)} fillOpacity={1} fill={`url(#color${metric})`} strokeWidth={2} animationDuration={1000} dot={{
            r: 3
          }} activeDot={{
            r: 5,
            stroke: getLineColor(metric),
            strokeWidth: 2
          }} />
            </AreaChart> : chartType === 'line' ? <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
              <XAxis dataKey="date" tick={{
            fontSize: 12
          }} />
              <YAxis tick={{
            fontSize: 12
          }} domain={[minValue, maxValue]} />
              <Tooltip contentStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
          }} formatter={(value, name) => [value, metricOptions.find(opt => opt.value === name)?.label || name]} />
              <Legend />
              {referenceValue && <ReferenceLine y={referenceValue} stroke="#888" strokeDasharray="3 3" label={{
            position: 'right',
            value: `Target: ${referenceValue}`,
            fill: '#888',
            fontSize: 12
          }} />}
              <Line type="monotone" dataKey={metric} stroke={getLineColor(metric)} strokeWidth={2} dot={{
            r: 3
          }} activeDot={{
            r: 5
          }} animationDuration={1000} />
            </LineChart> : chartType === 'bar' ? <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
              <XAxis dataKey="date" tick={{
            fontSize: 12
          }} />
              <YAxis tick={{
            fontSize: 12
          }} domain={[minValue, maxValue]} />
              <Tooltip contentStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
          }} formatter={(value, name) => [value, metricOptions.find(opt => opt.value === name)?.label || name]} />
              <Legend />
              {referenceValue && <ReferenceLine y={referenceValue} stroke="#888" strokeDasharray="3 3" label={{
            position: 'right',
            value: `Target: ${referenceValue}`,
            fill: '#888',
            fontSize: 12
          }} />}
              <Bar dataKey={metric} fill={getLineColor(metric)} radius={[4, 4, 0, 0]} animationDuration={1000} />
            </BarChart> : <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
              <XAxis dataKey="date" tick={{
            fontSize: 12
          }} />
              <YAxis yAxisId="left" tick={{
            fontSize: 12
          }} domain={[minValue, maxValue]} />
              {secondaryMetric && <YAxis yAxisId="right" orientation="right" tick={{
            fontSize: 12
          }} />}
              <Tooltip contentStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
          }} formatter={(value, name) => [value, metricOptions.find(opt => opt.value === name)?.label || name]} />
              <Legend />
              {referenceValue && <ReferenceLine y={referenceValue} yAxisId="left" stroke="#888" strokeDasharray="3 3" label={{
            position: 'right',
            value: `Target: ${referenceValue}`,
            fill: '#888',
            fontSize: 12
          }} />}
              <Area type="monotone" dataKey={metric} fill={`${getLineColor(metric)}80`} stroke={getLineColor(metric)} yAxisId="left" animationDuration={1000} />
              {secondaryMetric && <Line type="monotone" dataKey={secondaryMetric} stroke={getLineColor(secondaryMetric)} yAxisId="right" strokeWidth={2} dot={{
            r: 3
          }} activeDot={{
            r: 5
          }} animationDuration={1000} />}
            </ComposedChart>}
        </ResponsiveContainer>
      </div>
    </div>;
};