const app = require("express")();

const { MongoClient } = require("mongodb");

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

app.get("/users", async (req, res) => {
  try {
    const client = new MongoClient("mongodb://192.168.99.101:27017", {
      useNewUrlParser: true,
    });

    const conn = await client.connect();

    const db = await conn.db("docker-mongo-node");

    const collection = await db.collection("users");

    await collection.insertMany([
      {
        name: "ABC",
        email: "abc@xyz.com",
      },
      {
        name: "XYZ",
        email: "xyz@gmail.com",
      },
    ]);

    const data = await collection.find({}).toArray();

    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error("/users :: err :: ", err);
  }
});

app.listen(8090, () => {
  console.log("app on port 8090");
});
