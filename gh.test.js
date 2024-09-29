let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});



describe("Github page tests", () => {
     beforeEach(async () => {
       await page.goto("https://github.com/team");
     });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title = await page.title();
    const expected = "GitHub for teams · Build like the best teams on the planet · GitHub";
    expect(title).toEqual(expected);
  }, 50000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    const expected = "#start-of-content";
    expect(actual).toEqual(expected);
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    const expected = "Get started with Team";
    expect(actual).toContain(expected)
  }, 5000);
});

 test("The h1 header on /team", async () => {
   await page.goto("https://github.com/team");
   const title = ".h1-mktg.col-md-10.mx-auto.mb-3";
   const actual = await page.$eval(title, (link) => link.textContent);
   const expected = "Build like the best teams on the planet";
   await expect(actual).toContain(expected);
 }, 5000);

  test("The page /home contains button", async () => {
    await page.goto("https://github.com/home")
    const btnSelector = "div[class='pb-2'] div a[class='btn-mktg home-campaign-enterprise btn-muted-mktg']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    const expected = "Start a free enterprise trial";
    expect(actual).toContain(expected);
  }, 5000);

  test("The title on /sponsors", async () => {
    await page.goto("https://github.com/sponsors");
    const title = "#hero-section-brand-heading";
    const actual = await page.$eval(title, (link) => link.textContent);
    const expected = "Support the developers who power open source";
    expect(actual).toContain(expected);
  }, 10000);