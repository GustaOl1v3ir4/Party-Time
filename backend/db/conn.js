const mongoose = require("mongoose");

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao banco");
    } catch (error) {
        console.log("Erro ao conectar ao banco:", error);
    }
    console.log("MONGO_URI:", process.env.MONGO_URI);

}

module.exports = main;
