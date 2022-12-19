const puppeteer = require("puppeteer");
const data = {
	list: []
};

const main = async (skill) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(
		`https://in.indeed.com/jobs?q=${skill}&l=Hyderabad%2C+Telangana`,
		{
			timeout: 0,
			waitUntil: "networkidle0"
		}
	);
	const jobData = await page.evaluate(async (data) => {
		const items = document.querySelectorAll("td.resultContent");
		items.forEach((item, index) => {
			console.log(`scraping data of product: ${index}`);
			const title = item.querySelector("h2.jobTitle>a")?.innerText;
			const link = item.querySelector("h2.jobTitle>a")?.href;
			const salary = item.querySelector(
				"div.metadata salary-snippet-container>div"
			)?.innerText;
			const company = item.querySelector("span.companyName")?.innenText;
			if (salary === null) {
				salary = "not defined";
			}

			data.list.push({
				title,
				link,
				salary,
				company
			});
		});
		return data;
	}, data);

  let response = await jobData;
  browser.close();
  return response;
};

module.exports = main;
