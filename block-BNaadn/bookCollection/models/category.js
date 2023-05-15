let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema({
    name:[{type:String, required: true}],
    bookId: [{ type: Schema.Types.ObjectId, ref: 'Book', required: true }],
});


let Category = mongoose.model('Category', categorySchema);

module.exports = Category;