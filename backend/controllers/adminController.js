const User = require("../models/User");
const Party = require("../models/Party");

const adminController = {

  async getDashMetrics(req, res) {
    try {
      const totalUsers = await User.countDocuments();
      const totalParties = await Party.countDocuments();
      const totalAdmins = await User.countDocuments({ role: "admin" });

      const servicesAgg = await Party.aggregate([
        { $project: { serviceCount: { $size: "$services" } } },
        { $group: { _id: null, total: { $sum: "$serviceCount" } } },
      ]);
      const totalServices = servicesAgg[0]?.total || 0;

      const budgetAgg = await Party.aggregate([
        { $group: { _id: null, total: { $sum: "$budget" } } },
      ]);
      const totalBudget = budgetAgg[0]?.total || 0;

      const partiesByMonth = await Party.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      res.status(200).json({
        totalUsers,
        totalParties,
        totalAdmins,
        totalServices,
        totalBudget,
        partiesByMonth,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async getAllParties(req, res) {
    try {
      const parties = await Party.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

      res.status(200).json(parties);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

};

module.exports = adminController;