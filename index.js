const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

// middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3sh2wxl.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const productsCollection = client.db('emaJohn').collection('products');

        app.get('/products', async(req,res)=>{
            const query ={};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally {

    }

}
run().catch(err => console.error(err))


app.get('/', (req, res) => {
    res.send('Ema john server runing.');
})

app.listen(port, (req, res) => {
    console.log(`Ema john server runing on ${port}`)
})

