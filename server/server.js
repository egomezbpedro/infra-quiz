const app = require('./index.js');
const mongoose = require('mongoose');
require('dotenv').config()

const {MONGO_IP, MONGO_INITDB_ROOT_PASSWORD, MONGO_PORT, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_DATABASE, NODE_PORT} = process.env;

const mongoURL= `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_INITDB_ROOT_PASSWORD}?directConnection=true&authSource=admin`

function connectToDatabase (){
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then(() => {
        console.log("Connected to MongoDB");
        app.listen(NODE_PORT, () => {
            console.log(`Server has started on port http://localhost:${NODE_PORT}`);
        })
    }).catch((e) => {
        console.log(`Error while connecting: ${e}`);
        setTimeout(()=>{
            connectToDatabase();
        }, 60000)
    })
}

connectToDatabase();