const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://userone:userone@ictakfiles.at4m7.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    email : String,
    username : String,
    password : String,
    role: String
});

var Signupdata = mongoose.model('signupdata', RegisterSchema);

module.exports = Signupdata;