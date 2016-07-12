var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
var Currency = mongoose.Types.Currency
//https://www.npmjs.com/package/mongoose-currency

///////// schema for comment ////
var commentSchema = new Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
)

////  schema for Dishes ////////
var dishSchema = new Schema(
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
        category: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: '' //empty string
        },
        price: {
            type: Currency, //schemaType
            required: true
        },
        description: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },

    {
        timestamps: true
    }
)

var Dishes = mongoose.model('Dish', dishSchema)
//// export out to other modules////
module.exports = Dishes