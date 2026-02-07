const isAdmin = (req, res, next) => {
    try {
        if(!req.user){
            return res.status(401).json({
                message: "Usuário não autenticado"
            });
        }

        if(req.user.role !== "admin"){
            return res.status(403).json({
                message: "Acesso negado. Usuário não é administrador"
            })
        }

        next();

    } catch (error) {
        res.status(500).json({
            message: "Erro ao validar permissão de administrador"
        })
    }
}


module.exports = isAdmin;