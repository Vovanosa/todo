import { test, expect } from "@playwright/test";

test("Open page", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toBeDefined();
});

test("Creates a simple task", async ({ page }) => {
    await page.goto("http://localhost:3000");
  
    await page.click('button:text-is("Додати завдання")');
    await page.fill('input[type="text"]', "покакати");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    await page.waitForSelector('span:has-text("покакати")');
  });

test("Creates a task with racing option", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.click('button:text-is("Додати завдання")');
  await page.waitForSelector("select");
  await page.selectOption("select", "round");
  await page.waitForSelector("select:nth-child(2)");
  await page.selectOption("select:nth-child(2)", "5");
  await page.fill('input[type="text"]', "посрати до раунду:");
  await page.click('button:text-is("Додати")');
  await page.waitForSelector('span:has-text("посрати до раунду: round 5")');
});

test("Creates a task with a date", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.click('button:text-is("Додати завдання")');
  await page.fill('input[type="text"]', "не срати до дедлайну");
  await page.click('input[type="checkbox"]');
  await page.fill('input.react-date-picker__inputGroup__input.react-date-picker__inputGroup__day', '20');
  await page.fill('input.react-date-picker__inputGroup__input.react-date-picker__inputGroup__month', '12');
  await page.fill('input.react-date-picker__inputGroup__input.react-date-picker__inputGroup__year', '2024');
  await page.click('button:text-is("Додати")');
  await page.waitForSelector('button:has-text("Fri Dec 20 2024")');
});
