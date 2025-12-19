const mongoose = require("mongoose");

const { Schema } = mongoose;

const {serviceSchema} = require("./Service")

const partySchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    services: {
        type: [serviceSchema], 
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},
    {timestamps: true}
);

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
