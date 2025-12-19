const jwt = require("jsonwebtoken")
const user = require("../models/User")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if(!authHeader) {
            return res.status(401).json({
                message: "Acesso negado. Token não fornecido"
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "Acesso negado. Token não fornecido"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if(!user) {
            return res.status(401).json({
                message: "Usuário não encontrado"
            });
        }
        req.user = user;
        next();


    } catch (error) {
        return res.status(401).json({
            message: "Token inválido ou expirado"
        });
    }
};

module.exports = authMiddleware;