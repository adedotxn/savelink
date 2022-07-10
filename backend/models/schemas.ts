const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinksSchema = new 
    Schema({
        owner : {type : Schema.Types.ObjectId},
        title : {type : String},
        url : {type : String, required: true},
        category : {type : String},
        bookmarked : {type : Boolean, default : false },
        time : {type : String, default: Date.now()}
    }
);

const Links = mongoose.model('Links', LinksSchema);

module.exports = Links;