const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
// mongodb database 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rh6ekch.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const userDetailsCollection = client.db('loanRegister').collection('userDetailsCollection');
        app.get('/userDetails', async (req, res) => {
            const query = {};
            const cursor = userDetailsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });
        app.post('/userDetails', async (req, res) => {
            const product = req.body;
            const result = await userDetailsCollection.insertOne(product);
            res.send(result)
        })

    }
    finally{

    }
}
run().catch(error => console.log(error));


app.get('/', async(req, res)=>{
    res.send('Loan Registratioin server is running');
})

app.listen(port, ()=>{
    console.log(`Loan Registratioin server is running on ${port}`);
})