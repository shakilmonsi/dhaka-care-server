
const express =require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
// require('dotenv').config()

const app = express ()
const cors= require('cors')
const port = process.env.PORT || 5000

// middiewarer 
app.use(cors())
app.use(express.json())

// DB_USER=doctorsProtalsFive-server
// DB_PASS=doctorsProtalsFive-server
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fm710lc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// dotenv crud mongodb example
 
async function run(){
  try{
// const appointmentOptionCollextion = client.db('doctorprotailfive-main').collection('adersoptions')
const serviceCollection = client.db('sssgeniusCargeniusCar').collection('servicessservicess');
const orderCollection = client.db('sssgeniusCargeniusCar').collection('orders ');

app.get('/services', async (req,res)=>{
  const query ={}
  const option = await serviceCollection.find(query).toArray();
  
res.send(option)

})
app.get('/services/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const service = await serviceCollection.findOne(query);
  res.send(service);
});

// orders api
app.get('/orders', async (req, res) => {
  let query = {};

  if (req.query.email) {
      query = {
          email: req.query.email
      }
  }

  const cursor = orderCollection.find(query);
  const orders = await cursor.toArray();
  res.send(orders);
});

app.post('/orders', async (req, res) => {
  const order = req.body;
  const result = await orderCollection.insertOne(order);
  res.send(result);
});

app.patch('/orders/:id', async (req, res) => {
  const id = req.params.id;
  const status = req.body.status
  const query = { _id: ObjectId(id) }
  const updatedDoc = {
      $set: {
          status: status
      }
  }
  const result = await orderCollection.updateOne(query, updatedDoc);
  res.send(result);
})

app.delete('/orders/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await orderCollection.deleteOne(query);
  res.send(result);
})

  }
  finally{

  }

}
run().catch(console.log)



///
//  userName:userclasssix
//password: xJRbcfu51v9KBKiW

app.get('/',(req,res)=>{
        res.send('running')
})
app.listen(port,()=>{
        console.log(`running${port}`)
})