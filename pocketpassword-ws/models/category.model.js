const db = require('mongoose');
const schema = db.Schema;

let categorySchema = new schema({
    name: {type: String, required:true, max:100},
    backgroundColor: {type: String, default: '0xffffff'}
});

module.exports = db.model('Category', categorySchema);
