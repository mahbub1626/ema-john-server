const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

// middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3sh2wxl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const productsCollection = client.db('emaJohn').collection('products');

        app.get('/products', async (req, res) => {
            // pagination
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            console.log(page, size)
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.skip(page * size).limit(size).toArray();
            const count = await productsCollection.estimatedDocumentCount();
            res.send({ count, products });
        });

        app.post('/productsByIds', async (req, res) => {
            const ids = req.body;
            console.log(ids)
            const objectsIds = ids.map(id => ObjectId(id));
            const query = {_id: {$in: objectsIds}};
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

