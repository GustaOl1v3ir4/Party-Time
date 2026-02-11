const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const { user } = req;

    if (!user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Acesso negado",
      });
    }

    next();
  };
};

module.exports = checkRole;
