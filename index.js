import express from "express";
import cluster from "cluster";
import { delay } from "./src/utils/delay.utils.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Clustering Approach of Nodejs</h1>");
});

// envoking blocking statement
app.get("/blocking", (req, res) => {
  delay();
  res.send("It's delay response !!");
});

// Clustering
if (cluster.isPrimary) {
  // master process
  console.log("Master started....\n");

  //   forking
  cluster.fork(); // 1st worker
  cluster.fork(); // 2nd worker

  console.log("Worker Count: ", Object.keys(cluster.workers).length);
} else {
  // workers process
  console.log(`\nWorker ${cluster.worker.id} started...`);
  app.listen(port, () => console.log(`\nOn port ${port}!`));
}
