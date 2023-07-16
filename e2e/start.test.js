/* eslint-disable jest/expect-expect */
import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("page start", () => {
  let browser;
  let page;
  let server = null;
  const baseUrl = "http://localhost:9002";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });
    //открыть браузер
    browser = await puppeteer.launch({
      //   headless: false,
      //   slowMo: 150,
      //   devtools: true,
      //   env: {
      //     DISPLAY: ":10.0",
      //   },
    });

    //просим браузер открыть новую страницу
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("testing valid number", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".validator");

    const input = await page.$("#card-number");
    const btnSubmit = await page.$(".card-submit");

    await input.type("4024007167092450");
    await btnSubmit.click();

    expect(await page.$eval(".message", (elem) => elem.innerText)).toBe(
      "Валидный номер карты",
    );
  });

  test("testing not valid number", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".validator");

    const input = await page.$("#card-number");
    const btnSubmit = await page.$(".card-submit");

    await input.type("11111111111111111");
    await btnSubmit.click();

    expect(await page.$eval(".message", (elem) => elem.innerText)).toBe(
      "Не валидный номер карты",
    );
  });
});
