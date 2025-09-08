import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { CheckCircle } from 'lucide-react';

const OnboardingWorkflow: React.FC = () => {
  const { onboardingWorkflow } = useStore();

  if (!onboardingWorkflow) {
    return (
      <Card className="h-full bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Onboarding Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">No workflow information available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-gray-900 border-gray-800 mt-6">
      <CardHeader>
        <CardTitle className="text-white">Onboarding Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-700">
          {onboardingWorkflow.steps.map((step, index) => (
            <li key={index} className="mb-4 ml-4">
              <div className={`absolute w-6 h-6 rounded-full -left-3 border border-gray-900 ${
                index === 0 ? 'bg-blue-500' : 'bg-gray-700'
              }`}></div>
              <div className="flex items-center">
                {index === 0 && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
                <p className={`text-sm ${index === 0 ? 'text-white' : 'text-gray-400'}`}>
                  {step}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default OnboardingWorkflow;