import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { AlertTriangle, FileText, Home, Scale, CheckCircle } from 'lucide-react';

const BorrowerDetail: React.FC = () => {
  const { activeBorrower } = useStore();

  if (!activeBorrower) {
    return (
      <Card className="h-full bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Borrower Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Select a borrower to view details</p>
        </CardContent>
      </Card>
    );
  }

  // Check if we have detailed information or just basic pipeline info
  const hasDetailedInfo = activeBorrower.email !== undefined;

  return (
    <Card className="h-full bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="sm:flex inline justify-between items-start">
          <div>
            <CardTitle className="text-white">{activeBorrower.name}</CardTitle>
            {hasDetailedInfo ? (
              <>
                <p className="text-gray-400">{activeBorrower.email}</p>
                <p className="text-gray-400">{activeBorrower.phone}</p>
              </>
            ) : (
              <p className="text-gray-400 text-sm mt-1">Basic information only - detailed data not available</p>
            )}
            <p className="text-white mt-2 sm:mb-0 mb-4">
              Loan Amount: ${(activeBorrower.loan_amount || activeBorrower.amount)?.toLocaleString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            (activeBorrower.status === 'In Review' || activeBorrower.status === 'Renew') ? 'bg-yellow-500' : 
            activeBorrower.status === 'New' ? 'bg-blue-500' : 
            'bg-green-500'
          }`}>
            {activeBorrower.status}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {hasDetailedInfo && activeBorrower.ai_flags && activeBorrower.ai_flags.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ai-explainability" className="border-gray-700">
              <AccordionTrigger className="text-white hover:no-underline hover:bg-gray-800 px-4 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  AI Explainability
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2">
                <div className="space-y-3">
                  {activeBorrower.ai_flags.map((flag, index) => (
                    <div key={index} className="flex items-start p-3 bg-red-900/20 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200">{flag}</p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-3 mt-4">
                  <Button variant="outline" className="flex-1 bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Request Documents
                  </Button>
                  <Button variant="outline" className="flex-1 bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                    <Home className="h-4 w-4 mr-2" />
                    Send to Valuer
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {hasDetailedInfo && (
          <>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-3">Loan Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Employment</p>
                  <p className="text-white">{activeBorrower.employment || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Existing Loan</p>
                  <p className="text-white">${activeBorrower.existing_loan?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Credit Score</p>
                  <p className="text-white">{activeBorrower.credit_score || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Source of Funds</p>
                  <p className="text-white">{activeBorrower.source_of_funds || 'N/A'}</p>
                </div>
              </div>
            </div>

            {activeBorrower.risk_signal && (
              <div className="flex items-start p-3 bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200">{activeBorrower.risk_signal}</p>
              </div>
            )}
          </>
        )}

        <div className="sm:flex inline space-x-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white mb-5 sm:mb-0">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Loan
          </Button>
          <Button className="flex-1 bg-gray-800 border border-gray-700 text-white hover:bg-gray-700">
            <Scale className="h-4 w-4 mr-2" />
            Escalate to Credit Committee
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BorrowerDetail;