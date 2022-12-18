const express = require("express");
const router = express.Router();
const main = require("../scrapeFn/scrape");

router.post("/indeed", async (req, res) => {
	try {
		const { skill } = req.body;
		let scrape = await main(skill);
		return res.status(200).json({
			status: "ok",
			list: scrape?.list || {}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

module.exports = router;
