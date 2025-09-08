export interface Borrower {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  loan_amount?: number;
  status?: string;
  employment?: string;
  income?: number;
  existing_loan?: number;
  credit_score?: number;
  source_of_funds?: string;
  risk_signal?: string;
  ai_flags?: string[];
  loan_type?: string;
  amount?: number;
}

export interface BorrowerPipeline {
  new: Borrower[];
  in_review: Borrower[];
  approved: Borrower[];
}

export interface Broker {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
}

export interface OnboardingWorkflow {
  steps: string[];
}

export interface ApiResponse {
  endpoints: {
    name: string;
    method: string;
    url: string;
    response: BorrowerPipeline | Borrower | Broker | OnboardingWorkflow | { success: boolean; message: string };
  }[];
}