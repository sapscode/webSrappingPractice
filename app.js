const express = require("express");
const app = express();
const { PORT } = require("./config");

const getRoutes = require('./routes/getRoutes');

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", getRoutes);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
