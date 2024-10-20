const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

const {default: axios} = require('axios');

const port = process.env.port || 8000;

const corsOption ={
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nhcslav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
    try{
        const db = client.db('OnlineShop');
        const usersCollection = db.collection('users');

        

    } finally{

    } 
}
run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('Oshoppin server oky')
})

app.listen(port, () =>{
    console.log(`Oshop running`)
})