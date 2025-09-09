import { test } from '@playwright/test';
import sampleData from '../src/api/sample-response.json';

test('should validate sample data structure', () => {
  const endpoints = sampleData.endpoints;
  
  // Check borrower pipeline
  const pipelineEndpoint = endpoints.find(e => e.name === 'Get Borrower Pipeline');
  if (pipelineEndpoint && pipelineEndpoint.response) {
    const pipeline = pipelineEndpoint.response as any;
    console.log('Borrower Pipeline Data:', {
      new: pipeline.new?.length || 0,
      in_review: pipeline.in_review?.length || 0,
      approved: pipeline.approved?.length || 0
    });
  }

  // Check borrower details
  const detailEndpoint = endpoints.find(e => e.name === 'Get Borrower Detail');
  if (detailEndpoint && detailEndpoint.response) {
    const detail = detailEndpoint.response as any;
    console.log('Borrower Detail:', {
      name: detail.name,
      hasAiFlags: !!detail.ai_flags && detail.ai_flags.length > 0
    });
  }

  // Check broker info
  const brokerEndpoint = endpoints.find(e => e.name === 'Get Broker Info');
  if (brokerEndpoint && brokerEndpoint.response) {
    const broker = brokerEndpoint.response as any;
    console.log('Broker Info:', {
      name: broker.name,
      deals: broker.deals
    });
  }
});