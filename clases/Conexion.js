const mongoose = require('mongoose');
mongoose.connect('mongodb://m0ng0db:m0ng0dbpr3pr0d@ip/neo_patrimoniohoydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource:"admin",
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected'); // si esta todo ok, imprime esto
});
