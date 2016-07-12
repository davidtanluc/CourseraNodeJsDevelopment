var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
var Currency = mongoose.Types.Currency

////// promotions schema ///////
var promotionSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''  //empty string
    },
    price: {
        type: Currency, //schemaType
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    }, 
    
    {
    timestamps: true
    }
);

var Promotions = mongoose.model('Promotion', promotionSchema)

module.exports = Promotions