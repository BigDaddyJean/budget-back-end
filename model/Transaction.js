const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    date: {type:Date, default: Date.now},
    item_name: {type:String, required:true, minLength:3},
    amount: {type:Number, required:true},
    from: {type: String, required: true},
    category: {type: String, default: ""},
})

const model = mongoose.model("Transaction", Schema)

module.exports=model;