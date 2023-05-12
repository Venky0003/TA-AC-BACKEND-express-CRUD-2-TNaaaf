let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema({
    categoryname:[{type:String, required: true}]
});


let Category = mongoose.model('Category', categorySchema);

module.exports = Category;