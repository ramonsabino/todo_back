const express = require("express");
const cors = require("cors");
const todosRouter = require("./routes/routes");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(todosRouter);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
