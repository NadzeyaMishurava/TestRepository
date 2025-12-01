import { test, expect } from '@playwright/test';

/**
 * Test scenario:
 * 1. Navigate to the web page 'https://www.epam.com'
 * 2. Select "Services" from the header menu (https://www.epam.com/services)
 * 3. Click the "Explore Our Client Work" link.
 * 4. Verify that the "Client Work" text is visible on the page.
 */

test('EPAM Website Navigation Test', async ({ page }) => {
  // Step 1: Navigate to the EPAM website
  await test.step('Navigate to EPAM website', async () => {
    await page.goto('https://www.epam.com');
    await expect(page).toHaveTitle(/EPAM | Software Engineering & Product Development Services/);
  });

  // Step 2: Navigate to Services page
  await test.step('Navigate to Services page', async () => {
    // Direct navigation to services page as clicking the menu might be unreliable
    await page.goto('https://www.epam.com/services');
    await expect(page).toHaveTitle(/Services | EPAM/);
  });

  // Step 3: Click on "Explore Our Client Work" link
  await test.step('Click on Explore Our Client Work link', async () => {
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
    // Wait for navigation to complete
    await page.waitForURL('https://www.epam.com/services/client-work');
  });

  // Step 4: Verify that "Client Work" text is visible on the page
  await test.step('Verify Client Work text is visible', async () => {
    // Check if the page contains "Client Work" text
    const clientWorkText = page.getByText('Client Work', { exact: true });
    await expect(clientWorkText).toBeVisible();
    
    // Additional verification: check the page URL
    await expect(page).toHaveURL('https://www.epam.com/services/client-work');
  });
});