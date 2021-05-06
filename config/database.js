const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/ejs_db'
mongoose.connect(db, { useUnifiedTopology: true,  useNewUrlParser: true  } , (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected .. ^_^");
    }
})

module.exports = db;