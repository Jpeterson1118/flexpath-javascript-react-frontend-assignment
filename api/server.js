const express = require("express");
const app = express();
const port = 3000;
const apiRoutes = require("./routes");
const qs = require("qs");
const cors = require("cors")

// Root route

app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to the api",
  });
});

app.use(
  cors({
    origin: "http://localhost:5173"
  })
)
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
