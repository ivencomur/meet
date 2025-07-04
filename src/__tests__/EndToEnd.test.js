import puppeteer from 'puppeteer';

describe('Filter events by city (end-to-end)', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      timeout: 0
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
    const eventList = await page.$('.event');
    expect(eventList).toBeDefined();
  });

  test('User can search for a city and see suggestions.', async () => {
    await page.type('.city', 'Berlin');
    await page.waitForSelector('.suggestions');
    const suggestions = await page.$('.suggestions');
    expect(suggestions).toBeDefined();
  });
});