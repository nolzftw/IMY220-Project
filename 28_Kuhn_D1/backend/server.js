import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static("frontend/public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("frontend/public", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
