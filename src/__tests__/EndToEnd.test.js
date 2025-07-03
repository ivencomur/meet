
import puppeteer from 'puppeteer';

describe('Filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    // Launch browser
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, // slow down by 250ms
        timeout: 0 // remove any puppeteer/browser timeout limitations
      });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/'); // Making sure the dev server is running
    await page.waitForSelector('.event'); // Waiting for the first event to render
  });

  afterAll(() => {
    browser.close();
  });

  test('User can filter events by typing in the city textbox', async () => {
    // Simulate user typing "Berlin"
    await page.type('.city', 'Berlin');
    
    // Wait for suggestion list to appear
    await page.waitForSelector('.suggestions');

    // Get the text of the first suggestion
    const firstSuggestion = await page.$eval('.suggestions li:first-child', el => el.textContent);
    
    // Assert that the first suggestion is "Berlin, Germany"
    expect(firstSuggestion).toBe('Berlin, Germany');
  });
});