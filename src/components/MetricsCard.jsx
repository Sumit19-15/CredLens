import React, { useState, createContext, useContext } from 'react';
import { TrendingUpIcon, TrendingDownIcon, InfoIcon, XIcon, BarChart2Icon } from 'lucide-react';
import { ExpandedMetricView } from './ExpandedMetricView';
import { mockFinancialHistory } from '../utils/mockData';
// Create context for tracking which card is hovered
const HoverContext = createContext({
  hoveredId: null,
  setHoveredId: id => {}
});
export const MetricsCardProvider = ({
  children
}) => {
  const [hoveredId, setHoveredId] = useState(null);
  return <HoverContext.Provider value={{
    hoveredId,
    setHoveredId
  }}>
      {children}
    </HoverContext.Provider>;
};
export const MetricsCard = ({
  title,
  value,
  change,
  format = 'number',
  info,
  id
}) => {
  const [showExpanded, setShowExpanded] = useState(false);
  const {
    hoveredId,
    setHoveredId
  } = useContext(HoverContext);
  const isHovered = hoveredId === id;
  const otherCardHovered = hoveredId !== null && hoveredId !== id;
  // Format the value based on the format type
  const formattedValue = format === 'currency' ? `$${value.toLocaleString()}` : format === 'percentage' ? `${value}%` : format === 'ratio' ? value.toFixed(2) : value.toLocaleString();
  // Determine if the change is positive or negative
  const isPositive = change > 0;
  const isNeutral = change === 0;
  // For financial metrics, not all positive changes are good (e.g., increasing debt)
  const isGood = title.toLowerCase().includes('debt') ? !isPositive : isPositive;
  // Convert title to camelCase for accessing data in mockFinancialHistory
  const metricKey = title.toLowerCase().replace(/\s(.)/g, function ($1) {
    return $1.toUpperCase();
  }).replace(/\s/g, '').replace(/^(.)/, function ($1) {
    return $1.toLowerCase();
  });
  return <>
      <div className={`bg-white rounded-lg shadow p-4 transition-all duration-300 cursor-pointer relative ${isHovered ? 'border border-blue-200 shadow-md z-10 transform translate-y-[-4px]' : otherCardHovered ? 'border border-transparent transform scale-[0.98] opacity-90' : 'border border-transparent'}`} onClick={() => setShowExpanded(true)} onMouseEnter={() => setHoveredId(id)} onMouseLeave={() => setHoveredId(null)}>
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="relative group">
            <InfoIcon size={16} className="text-gray-400 cursor-help" />
            <div className="absolute right-0 w-64 p-2 mt-1 text-xs bg-gray-800 text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
              {info}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-semibold">{formattedValue}</div>
          <div className={`flex items-center mt-1 text-sm ${isNeutral ? 'text-gray-500' : isGood ? 'text-green-600' : 'text-red-600'}`}>
            {!isNeutral && (isPositive ? <TrendingUpIcon size={16} className="mr-1" /> : <TrendingDownIcon size={16} className="mr-1" />)}
            <span>
              {isNeutral ? 'No change' : `${Math.abs(change).toFixed(1)}% ${isPositive ? 'increase' : 'decrease'}`}
            </span>
          </div>
          {isHovered && <div className="mt-2 text-center text-xs text-gray-500 flex items-center justify-center animate-fadeIn">
              <BarChart2Icon size={12} className="mr-1" />
              <span>Click to expand</span>
            </div>}
        </div>
      </div>
      {showExpanded && <ExpandedMetricView title={title} value={value} format={format} metricKey={metricKey} isGood={isGood} onClose={() => setShowExpanded(false)} />}
    </>;
};