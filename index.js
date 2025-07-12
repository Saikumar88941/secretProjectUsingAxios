// 1. Import express and axios
import express from 'express';
import axios from 'axios';

// 2. Create an express app and set the port number
const app = express();
const port = 5000;

// 3. Use the public folder for static files
app.use(express.static("public"));

// 4. Set up EJS as the view engine
app.set("view engine", "ejs");

// 5. Handle the home route
app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", {
      secret: result.data.secret,
      user: result.data.username,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).send("Failed to fetch secret.");
  }
});

// 6. Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
