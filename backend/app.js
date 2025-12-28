require("dotenv").config();

const express = require("express")
const cors = require("cors")
const app = express()



app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://party-time-1.onrender.com"
    ];

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// DB Connection
const conn = require("./db/conn");
conn();

app.use(express.json());

// Routes
const router = require("./routes/router");
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

