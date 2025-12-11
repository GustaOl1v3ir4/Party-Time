const express = require("express");
const cors = require("cors");
const app = express();

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

// Porta correta para produção
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Servidor rodando na porta " + PORT);
});

