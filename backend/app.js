require("dotenv").config();

const express = require("express")
const cors = require("cors")
const app = express()



app.use(cors({
  origin: "https://party-time-1.onrender.com"
}));
app.use(express.json());

// DB Connection
const conn = require("./db/conn");
conn();

// Routes
const routes = require("./routes/router");
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

