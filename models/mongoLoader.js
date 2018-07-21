const mongoose = require('mongoose');
const config = require('config');
const dbUrl = "mongodb://daitasuAdmin:lilium_5D1338@ds239911.mlab.com:39911/trashday_tokyo";
// const dbUrl = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

mongoose.connect(dbUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('connected', () => {
    console.log('mongodb connected.');
});
db.on('error', (err) => {
    console.log('failed to connect mongodb : ' + err);
});
db.on('disconnected', () => {
    console.log('mongodb disconnected.');
});
db.on('close', () => {
    console.log('mongodb connection closed.');
});