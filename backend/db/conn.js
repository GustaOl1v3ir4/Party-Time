const mongoose = require ("mongoose");

async function main() {
    try {
        await mongoose.connect(
            "mongodb+srv://gustavoco201034_db_user:hzOcuMZMnhayOFUM@cluster0.xroedtc.mongodb.net/?appName=Cluster0"
        );

        console.log("Conectado ao banco")
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main