import React, { useState } from 'react';
import { AlertTriangleIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
export const RiskIndicator = ({
  creditScore,
  debtToEquity,
  quickRatio,
  interestCoverage
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // Define risk factors based on financial metrics
  const riskFactors = [{
    name: 'Credit Score',
    value: creditScore,
    threshold: 670,
    criticalThreshold: 580,
    isGood: creditScore >= 670,
    isCritical: creditScore < 580,
    message: creditScore >= 670 ? 'Strong credit score indicating low default risk' : creditScore >= 580 ? 'Moderate credit score suggesting potential concerns' : 'Low credit score indicating high default risk'
  }, {
    name: 'Debt to Equity',
    value: debtToEquity.toFixed(2),
    threshold: 1.5,
    criticalThreshold: 2,
    isGood: debtToEquity < 1.5,
    isCritical: debtToEquity >= 2,
    message: debtToEquity < 1.5 ? 'Healthy debt to equity ratio' : debtToEquity < 2 ? 'Elevated debt levels relative to equity' : 'High leverage indicating potential financial distress'
  }, {
    name: 'Quick Ratio',
    value: quickRatio.toFixed(2),
    threshold: 1.0,
    criticalThreshold: 0.8,
    isGood: quickRatio >= 1.0,
    isCritical: quickRatio < 0.8,
    message: quickRatio >= 1.0 ? 'Strong short-term liquidity position' : quickRatio >= 0.8 ? 'Adequate liquidity but potential concerns' : 'Poor liquidity indicating potential short-term payment issues'
  }, {
    name: 'Interest Coverage',
    value: interestCoverage.toFixed(2),
    threshold: 2.5,
    criticalThreshold: 1.5,
    isGood: interestCoverage >= 2.5,
    isCritical: interestCoverage < 1.5,
    message: interestCoverage >= 2.5 ? 'Strong ability to cover interest expenses' : interestCoverage >= 1.5 ? 'Adequate interest coverage but potential concerns' : 'Poor interest coverage indicating potential financial distress'
  }];
  // Calculate overall risk level
  const criticalFactors = riskFactors.filter(factor => factor.isCritical).length;
  const goodFactors = riskFactors.filter(factor => factor.isGood).length;
  let overallRisk;
  let overallColor;
  let overallIcon;
  if (criticalFactors >= 2) {
    overallRisk = 'High Risk';
    overallColor = 'text-red-600 bg-red-50';
    overallIcon = <AlertCircleIcon size={18} className="text-red-600" />;
  } else if (criticalFactors === 1 || goodFactors <= 1) {
    overallRisk = 'Moderate Risk';
    overallColor = 'text-amber-600 bg-amber-50';
    overallIcon = <AlertTriangleIcon size={18} className="text-amber-600" />;
  } else {
    overallRisk = 'Low Risk';
    overallColor = 'text-green-600 bg-green-50';
    overallIcon = <CheckCircleIcon size={18} className="text-green-600" />;
  }
  return <div className="bg-white rounded-lg shadow p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Risk Assessment</h2>
        <div className={`flex items-center px-3 py-1 rounded-full ${overallColor}`}>
          {overallIcon}
          <span className="ml-1 text-sm font-medium">{overallRisk}</span>
        </div>
      </div>
      <div className="space-y-4">
        {riskFactors.map((factor, index) => <div key={index} className={`flex items-center p-2 rounded-lg transition-all duration-300 ${hoveredIndex === index ? `transform translate-y-[-2px] shadow-md ${factor.isGood ? 'bg-green-50' : factor.isCritical ? 'bg-red-50' : 'bg-amber-50'}` : 'bg-transparent hover:bg-gray-50'}`} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className={`w-1.5 h-10 rounded-full mr-3 ${factor.isGood ? 'bg-green-500' : factor.isCritical ? 'bg-red-500' : 'bg-amber-500'}`} />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{factor.name}</span>
                <span className={`${factor.isGood ? 'text-green-600' : factor.isCritical ? 'text-red-600' : 'text-amber-600'}`}>
                  {factor.value}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{factor.message}</p>
            </div>
          </div>)}
      </div>
    </div>;
};