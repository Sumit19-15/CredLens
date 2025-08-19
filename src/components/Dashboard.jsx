import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { CreditScoreGauge } from './CreditScoreGauge';
import { MetricsCard, MetricsCardProvider } from './MetricsCard';
import { FinancialChart } from './FinancialChart';
import { CompanyProfile } from './CompanyProfile';
import { RiskIndicator } from './RiskIndicator';
import { mockCompanyData, mockFinancialHistory } from '../utils/mockData';
export const Dashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState(mockCompanyData[0]);
  return <div className="flex h-screen overflow-hidden">
      <Sidebar companies={mockCompanyData} selectedCompanyId={selectedCompany.id} onSelectCompany={id => {
      const company = mockCompanyData.find(c => c.id === id);
      if (company) setSelectedCompany(company);
    }} />
      <div className="flex-1 overflow-y-auto p-6">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedCompany.name} Credit Analysis
            </h1>
            <div className="text-sm text-gray-500">
              Last updated: {selectedCompany.lastUpdated}
            </div>
          </div>
          <p className="text-gray-600">
            Industry: {selectedCompany.industry} | Ticker:{' '}
            {selectedCompany.ticker}
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <CreditScoreGauge score={selectedCompany.creditScore} />
          </div>
          <div className="lg:col-span-2">
            <RiskIndicator creditScore={selectedCompany.creditScore} debtToEquity={selectedCompany.metrics.debtToEquity} quickRatio={selectedCompany.metrics.quickRatio} interestCoverage={selectedCompany.metrics.interestCoverage} />
          </div>
        </div>
        <MetricsCardProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricsCard id="debt-to-equity" title="Debt to Equity" value={selectedCompany.metrics.debtToEquity} change={selectedCompany.metrics.debtToEquityChange} format="ratio" info="Measures financial leverage by comparing total liabilities to shareholders' equity" />
            <MetricsCard id="current-ratio" title="Current Ratio" value={selectedCompany.metrics.currentRatio} change={selectedCompany.metrics.currentRatioChange} format="ratio" info="Measures ability to pay short-term obligations" />
            <MetricsCard id="quick-ratio" title="Quick Ratio" value={selectedCompany.metrics.quickRatio} change={selectedCompany.metrics.quickRatioChange} format="ratio" info="Measures ability to meet short-term obligations with most liquid assets" />
            <MetricsCard id="interest-coverage" title="Interest Coverage" value={selectedCompany.metrics.interestCoverage} change={selectedCompany.metrics.interestCoverageChange} format="ratio" info="Measures ability to pay interest on outstanding debt" />
          </div>
        </MetricsCardProvider>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4 h-full">
              <h2 className="text-lg font-semibold mb-4">
                Financial Performance History
              </h2>
              <FinancialChart data={mockFinancialHistory} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <CompanyProfile company={selectedCompany} />
          </div>
        </div>
      </div>
    </div>;
};