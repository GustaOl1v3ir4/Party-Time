const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign(
        {id}, 
        process.env.JWT_SECRET, 
        {expiresIn: "7d"}
    );
};

const authController = {

    //Criar novo usuário
    async register(req, res){
        try {
            const {name, email, password} = req.body;

            if(!name || !email || !password){
                return res.status(422).json({
                    message: "Todos os campos são obrigatórios"
                });
            }

            const userExists = await User.findOne({email});

            if(userExists){
                return res.status(422).json({
                    message: "E-mail já cadastrado"
                });
            }



            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);



            const user = new User({
                name,
                email,
                password: passwordHash
            });
            await user.save();



            res.status(201).json({
                message: "Usuário criado com sucesso",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });            


        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    },

    //Logar usuário
    async login(req, res){
        try {
            const {email, password} = req.body;

            if(!email || !password){
            return res.status(422).json({
                message: "Todos os campos são obrigatórios"
                });
            }


            const user = await User.findOne({email});

            if(!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }


            const checkPassword = await bcrypt.compare(password, user.password);
            if(!checkPassword){
                return res.status(401).json({
                    message: "Senha inválida"
                });
            }

            const token = generateToken(user._id);

            
            res.status(200).json({
                message: "Login realizado com sucesso",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });


        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    }
};

    



module.exports = authController;