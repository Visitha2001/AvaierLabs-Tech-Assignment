import { create } from 'zustand';
import type { Borrower, BorrowerPipeline, Broker, OnboardingWorkflow } from '@/types';
import sampleData from '@/api/sample-response.json';

interface AppState {
  activeBorrower: Borrower | null;
  setActiveBorrower: (borrower: Borrower) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  borrowerPipeline: BorrowerPipeline;
  brokerInfo: Broker | null;
  onboardingWorkflow: OnboardingWorkflow | null;
  actionMessage: string | null;
  actionSuccess: boolean | null;
  initializeData: () => void;
  getBorrowerDetails: (id: string) => Borrower | null;
  performAction: (actionName: string, borrowerId: string) => void;
  clearActionMessage: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  activeBorrower: null,
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
  activeTab: 'new',
  setActiveTab: (tab) => set({ activeTab: tab }),
  borrowerPipeline: { new: [], in_review: [], approved: [] },
  brokerInfo: null,
  onboardingWorkflow: null,
  actionMessage: null,
  actionSuccess: null,
  
  initializeData: () => {
    const borrowerPipeline = sampleData.endpoints.find(
      (e: any) => e.name === 'Get Borrower Pipeline'
    )?.response as BorrowerPipeline;
    
    const brokerInfo = sampleData.endpoints.find(
      (e: any) => e.name === 'Get Broker Info'
    )?.response as Broker;
    
    const onboardingEndpoint = sampleData.endpoints.find(
      (e: any) => e.name === 'Get Onboarding Workflow'
    );
    
    const onboardingWorkflow = onboardingEndpoint ? 
      (onboardingEndpoint.response as OnboardingWorkflow) : 
      null;
    
    const firstBorrower = borrowerPipeline?.new[0] || borrowerPipeline?.in_review[0] || borrowerPipeline?.approved[0];
    
    set({
      borrowerPipeline: borrowerPipeline || { new: [], in_review: [], approved: [] },
      brokerInfo: brokerInfo || null,
      onboardingWorkflow: onboardingWorkflow || { steps: [] },
      activeBorrower: firstBorrower || null,
      actionMessage: null,
      actionSuccess: null
    });
  },
  
  getBorrowerDetails: (id: string) => {
    const borrowerDetailEndpoint = sampleData.endpoints.find(
      (e: any) => e.name === 'Get Borrower Detail'
    );
    
    if (borrowerDetailEndpoint) {
      const borrowerDetail = borrowerDetailEndpoint.response as Borrower;
      if (borrowerDetail && borrowerDetail.id === id) {
        return borrowerDetail;
      }
    }
    
    const { borrowerPipeline } = get();
    const allBorrowers = [
      ...(borrowerPipeline.new || []), 
      ...(borrowerPipeline.in_review || []), 
      ...(borrowerPipeline.approved || [])
    ];
    
    const basicBorrowerInfo = allBorrowers.find(borrower => borrower.id === id);
    
    return basicBorrowerInfo || null;
  },
  
  performAction: (actionName: string, borrowerId: string) => {
    const actionEndpoint = sampleData.endpoints.find(
      (e: any) => e.name === actionName
    );
    
    if (actionEndpoint && actionEndpoint.response) {
      const response = actionEndpoint.response as { success: boolean; message: string };
      set({
        actionMessage: response.message,
        actionSuccess: response.success
      });
      
      setTimeout(() => {
        get().clearActionMessage();
      }, 3000);
      
      if (actionName === 'Approve Loan' && response.success) {
        const { borrowerPipeline, activeBorrower } = get();
        
        const newBorrowers = borrowerPipeline.new.filter(b => b.id !== borrowerId);
        const inReviewBorrowers = borrowerPipeline.in_review.filter(b => b.id !== borrowerId);
        
        const borrowerToApprove = [...borrowerPipeline.new, ...borrowerPipeline.in_review]
          .find(b => b.id === borrowerId);
        
        if (borrowerToApprove) {
          const approvedBorrower = {
            ...borrowerToApprove,
            status: 'Approved'
          };
          
          set({
            borrowerPipeline: {
              new: newBorrowers,
              in_review: inReviewBorrowers,
              approved: [...borrowerPipeline.approved, approvedBorrower]
            }
          });
          
          if (activeBorrower && activeBorrower.id === borrowerId) {
            set({ activeBorrower: approvedBorrower });
          }
        }
      }
    } else {
      set({
        actionMessage: 'Action not found in sample data',
        actionSuccess: false
      });
    }
  },
  
  clearActionMessage: () => {
    set({ actionMessage: null, actionSuccess: null });
  }
}));