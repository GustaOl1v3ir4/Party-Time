const User = require("../models/User");
const Party = require("../models/Party");


const adminController = {
    async getDashMetrics(req, res){

        try {
            const totalUsers = await User.countDocuments();
            const totalParties = await Party.countDocuments();
            const totalAdmins = await User.countDocuments({role: "admin"});

            res.status(200).json({
                totalUsers,
                totalParties,
                totalAdmins
            })



        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor"
            });
        
        }
    }

};

module.exports = adminController;