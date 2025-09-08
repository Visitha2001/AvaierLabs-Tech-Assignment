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
    
    const onboardingWorkflow = sampleData.endpoints.find(
      (e: any) => e.name === 'Get Onboarding Workflow'
    )?.response as OnboardingWorkflow;
    
    // Set the first borrower as active by default
    const firstBorrower = borrowerPipeline?.new[0] || borrowerPipeline?.in_review[0] || borrowerPipeline?.approved[0];
    
    set({
      borrowerPipeline: borrowerPipeline || { new: [], in_review: [], approved: [] },
      brokerInfo: brokerInfo || null,
      onboardingWorkflow: onboardingWorkflow || null,
      activeBorrower: firstBorrower || null,
      actionMessage: null,
      actionSuccess: null
    });
  },
  
  getBorrowerDetails: (id: string) => {
    // In a real app, this would be an API call
    // For now, we'll check if the requested ID matches the sample data
    const borrowerDetailEndpoint = sampleData.endpoints.find(
      (e: any) => e.name === 'Get Borrower Detail'
    );
    
    if (borrowerDetailEndpoint) {
      const borrowerDetail = borrowerDetailEndpoint.response as Borrower;
      if (borrowerDetail && borrowerDetail.id === id) {
        return borrowerDetail;
      }
    }
    
    // If no detailed data is available for this ID, try to find the borrower in the pipeline
    const { borrowerPipeline } = get();
    const allBorrowers = [
      ...(borrowerPipeline.new || []), 
      ...(borrowerPipeline.in_review || []), 
      ...(borrowerPipeline.approved || [])
    ];
    
    const basicBorrowerInfo = allBorrowers.find(borrower => borrower.id === id);
    
    // Return the basic info if found, otherwise return null
    return basicBorrowerInfo || null;
  },
  
  performAction: (actionName: string, borrowerId: string) => {
    // Find the action in the sample data
    const actionEndpoint = sampleData.endpoints.find(
      (e: any) => e.name === actionName
    );
    
    if (actionEndpoint && actionEndpoint.response) {
      const response = actionEndpoint.response as { success: boolean; message: string };
      set({
        actionMessage: response.message,
        actionSuccess: response.success
      });
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        get().clearActionMessage();
      }, 3000);
      
      // If it's an approve action, move the borrower to approved status
      if (actionName === 'Approve Loan' && response.success) {
        const { borrowerPipeline, activeBorrower } = get();
        
        // Remove from current arrays
        const newBorrowers = borrowerPipeline.new.filter(b => b.id !== borrowerId);
        const inReviewBorrowers = borrowerPipeline.in_review.filter(b => b.id !== borrowerId);
        
        // Find the borrower to approve
        const borrowerToApprove = [...borrowerPipeline.new, ...borrowerPipeline.in_review]
          .find(b => b.id === borrowerId);
        
        if (borrowerToApprove) {
          // Update status
          const approvedBorrower = {
            ...borrowerToApprove,
            status: 'Approved'
          };
          
          // Update pipeline
          set({
            borrowerPipeline: {
              new: newBorrowers,
              in_review: inReviewBorrowers,
              approved: [...borrowerPipeline.approved, approvedBorrower]
            }
          });
          
          // Update active borrower if it's the one being approved
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