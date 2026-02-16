const PartyModel = require("../models/Party");
const User = require("../models/User");

const checkPartyBudget = (budget, services) => {

    const priceSum = services.reduce((sum, service) => sum + service.price, 0);

    console.log(priceSum, budget)

    if(priceSum > budget){
        return false;
    }
    return true;
}


const partyController = {

    create: async(req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.user.name,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
                user: req.user._id
            };

            //BUDGET < VALOR DO SERVICO != NOVO SERVICO
            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "O seu orçamento é insuficiente."})
                return;
            }

            const response = await PartyModel.create(party);

            res.status(201).json({response, msg: "Festa criada com sucesso!"});

        } catch (error) {
            console.log(error);
        }
    },

    getAll: async(req, res) => {
        try {

            const parties = await PartyModel.find({user: req.user._id});

            res.json(parties);

        } catch (error) {
            console.log(error);
        }
    },

    get: async(req, res) => {
        try{
            const id = req.params.id
            const party = await PartyModel.findById(id);

            if(!party){
                res.status(404).json({msg: "Essa festa não existe"});
                return;
            }
            res.json(party);

        }catch(error){
            console.log(error);
        }
    },

    getMyParties: async(req, res) => {
        try {
            const parties = await PartyModel.find({
                user: req.user._id
            });
            res.status(200).json(parties);
        } catch (error) {
            console.log(error);
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id;
            const party = await PartyModel.findById(id);

            if(!party){
                return res.status(404).json({msg: "Essa festa não existe"});
                
            }


            if(party.user.toString() !== req.user._id.toString()){
                return res.status(401).json({msg: "Acesso negado"})
            }

            const deleteParty = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({deleteParty, msg: "Festa excluída com sucesso!"})
            

        } catch (error) {
            console.log(error);
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id;

            const existingParty = await PartyModel.findById(id);

            if(!existingParty) {
                return res.status(404).json({msg: "Essa festa não existe"});
            }

            if(existingParty.user.toString() !== req.user._id.toString()){
                return res.status(401).json({msg: "Acesso negado"})
            }

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            };

            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "O seu orçamento é insuficiente."})
                return;
            }


            const updateParty = await PartyModel.findByIdAndUpdate(id, party, {new: true});
      


            res.status(200).json({updateParty, msg: "Festa atualizada com sucesso!"});


        } catch (error) {
            console.log(error);
        }
    }


}
module.exports = partyController;