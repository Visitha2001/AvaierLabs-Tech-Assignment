import React from 'react';
import BorrowerPipeline from '@/components/dashboard/BorrowerPipeline';
import BorrowerDetail from '@/components/dashboard/BorrowerDetail';
import BrokerOverview from '@/components/dashboard/BrokerOverview';
import OnboardingWorkflow from '@/components/dashboard/OnboardingWorkflow';

const Dashboard: React.FC = () => {
  return (
    <div className="sm:mx-40 mx-10 my-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <BorrowerPipeline />
      </div>
      <div className="lg:col-span-1">
        <BorrowerDetail />
      </div>
      <div className="flex flex-col">
        <BrokerOverview />
        <OnboardingWorkflow />
      </div>
    </div>
  );
};

export default Dashboard;