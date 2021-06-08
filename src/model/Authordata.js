const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://userone:userone@ictakfiles.at4m7.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
// mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    author : String,
    about : String,
    image : String
});

var Authordata = mongoose.model('authordata', AuthorSchema);

module.exports = Authordata;