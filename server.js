const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.post("/", (req, res) => {
	image(req.body.url)
		.then((data) => res.json(data))
		.catch((err) => console.error(err));
});

app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

// get image from the url and make it an array buffer and send to client
async function image(url) {
	const response = await axios.get(url, { responseType: "arraybuffer" });
	return Buffer.from(response.data, "utf-8");
}
