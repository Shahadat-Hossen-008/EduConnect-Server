require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());
//CollegeManagement
//
const uri =`mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.fzuzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const collegeCollections = client.db("CollegeManagement").collection("CollegeBooking");
    app.get("/college-limit-list", async(req, res)=>{
      const result = await collegeCollections.find().limit(3).toArray();
      res.send(result);
    })
    app.get("/college-list",async (req, res) => {
      const result = await collegeCollections.find().toArray();
      res.send(result);
    });
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get("/", (req, res) => {
  res.send("College booking");
});

app.listen(port, () => {
  console.log(`This port is running ${port}`);
});