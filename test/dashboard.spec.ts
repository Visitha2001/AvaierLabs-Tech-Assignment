import { test, expect } from '@playwright/test';

test.describe('Borrower Management Dashboard - Essential Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="borrower-pipeline"]', { timeout: 10000 });
  });

  test('should load dashboard with all main sections', async ({ page }) => {
    await expect(page.getByTestId('borrower-pipeline')).toBeVisible();
    await expect(page.getByTestId('borrower-detail')).toBeVisible();
    await expect(page.getByTestId('broker-overview')).toBeVisible();
  });

  test('should display borrower pipeline with tabs and borrowers', async ({ page }) => {
    await expect(page.getByTestId('tab-new')).toBeVisible();
    await expect(page.getByTestId('tab-in-review')).toBeVisible();
    await expect(page.getByTestId('tab-approved')).toBeVisible();
    await expect(page.getByTestId('borrower-name').first()).toBeVisible();
  });

  test('should update borrower details when a borrower is selected', async ({ page }) => {
    await page.getByTestId('borrower-item-1').click();
    await expect(page.getByText('sarah.dunn@example.com')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('(355)123-4557')).toBeVisible();
  });

  test('should expand/collapse AI Explainability section', async ({ page }) => {
    await page.getByTestId('borrower-item-1').click();
    await page.waitForTimeout(1000);
    await page.getByText('AI Explainability').click();
    await expect(page.getByText('Income Inconsistent with Bank statements')).toBeVisible({ timeout: 5000 });
    await page.getByText('AI Explainability').click();
    await expect(page.getByText('Income Inconsistent with Bank statements')).not.toBeVisible();
  });

  test('should show success message when Approve Loan is clicked', async ({ page }) => {
    await page.getByTestId('borrower-item-1').click();
    await page.waitForTimeout(1000);
    await page.getByTestId('approve-loan-btn').click();
    await expect(page.getByText('Approved')).toBeVisible({ timeout: 5000 });
  });

  test('should display broker information from sample data', async ({ page }) => {
    await expect(page.getByText('Robert Turner')).toBeVisible();
    await expect(page.getByText('16')).toBeVisible();
    await expect(page.getByText('75%')).toBeVisible();
  });

  test('should show message for other action buttons', async ({ page }) => {
    await page.getByTestId('borrower-item-1').click();
    await page.waitForTimeout(1000);
    await page.getByText('AI Explainability').click();
    await page.waitForTimeout(500);
    await page.getByTestId('request-docs-btn').click();
    await expect(page.getByText('Documents requested.')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('send-valuer-btn').click();
    await expect(page.getByText('Valuer notified.')).toBeVisible({ timeout: 5000 });
    await page.getByTestId('escalate-btn').click();
    await expect(page.getByText('Escalated to Credit Committee.')).toBeVisible({ timeout: 5000 });
  });
});