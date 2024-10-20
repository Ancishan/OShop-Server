const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

const {default: axios} = require('axios');

const port = process.env.port || 5000;

const corsOption ={
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOption));
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

        app.post('/users', async(req, res) =>{
            try{
                const {name, email, photoURL, role} = req.body;
                const result = await usersCollection.insertOne({name, email, photoURL, role})
                res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
            }
            catch (err){
                console.error(err);
                res.status(500).json({ error: 'An error occurred while creating the user' });
            }
        })

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