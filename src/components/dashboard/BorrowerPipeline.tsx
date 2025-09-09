import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import type { Borrower } from '@/types';

const BorrowerPipeline: React.FC = () => {
  const { borrowerPipeline, activeTab, setActiveTab, setActiveBorrower, getBorrowerDetails } = useStore();

  const handleBorrowerClick = (borrower: Borrower) => {
    const borrowerDetails = getBorrowerDetails(borrower.id);
    if (borrowerDetails) {
      setActiveBorrower(borrowerDetails);
    } else {
      setActiveBorrower(borrower);
    }
  };

  const renderBorrowerList = (borrowers: Borrower[]) => {
    if (borrowers.length === 0) {
      return <p className="text-gray-400 text-sm">No borrowers found</p>;
    }

    return (
      <div className="space-y-3">
        {borrowers.map((borrower) => (
          <div
            key={borrower.id}
            className="p-3 rounded-lg border border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors"
            onClick={() => handleBorrowerClick(borrower)}
            data-testid={`borrower-item-${borrower.id}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white" data-testid="borrower-name">{borrower.name}</h4>
                <p className="text-sm text-gray-400" data-testid="borrower-loan-type">{borrower.loan_type}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-white" data-testid="borrower-amount">${borrower.amount?.toLocaleString()}</p>
                <span 
                  className={`text-xs px-2 py-1 rounded-full ${
                    borrower.status === 'New' ? 'bg-blue-500' : 
                    borrower.status === 'In Review' ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  data-testid="borrower-status"
                >
                  {borrower.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full bg-gray-900 border-gray-800" data-testid="borrower-pipeline">
      <CardHeader className="pb-3">
        <CardTitle className="text-white">Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" data-testid="pipeline-tabs">
          <TabsList className="grid grid-cols-3 mb-4 bg-gray-700">
            <TabsTrigger value="new" className="data-[state=active]:bg-gray-200" data-testid="tab-new">New</TabsTrigger>
            <TabsTrigger value="in_review" className="data-[state=active]:bg-gray-200" data-testid="tab-in-review">In Review</TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-gray-200" data-testid="tab-approved">Approved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="mt-0" data-testid="tab-content-new">
            {renderBorrowerList(borrowerPipeline.new)}
          </TabsContent>
          
          <TabsContent value="in_review" className="mt-0" data-testid="tab-content-in-review">
            {renderBorrowerList(borrowerPipeline.in_review)}
          </TabsContent>
          
          <TabsContent value="approved" className="mt-0" data-testid="tab-content-approved">
            {renderBorrowerList(borrowerPipeline.approved)}
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-2">F-SANATISED ACTIVE</h3>
          <div className="flex space-x-2">
            <label className="inline-flex items-center">
              <input type="radio" name="sanatised" className="form-radio text-blue-500 bg-gray-800" defaultChecked />
              <span className="ml-2 text-sm text-gray-300">Option 1</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BorrowerPipeline;