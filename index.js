import express from "express";
import cluster from "cluster";
import os from "os";
import { delay } from "./src/utils/delay.utils.js";

const app = express();
const port = 3000;

function checkProcessAndClusterId(routeIntro) {
  return `<div>
  <h1>${routeIntro}</h1>
  <p>
    Currently, this is handled by <br/> <strong>worker process id</strong>:
    <em> ${process.pid}</em> <br/> <strong>cluster id</strong>:
    <em>${cluster.worker.id}</em>
  </p>
</div>`;
}

app.get("/", (req, res) => {
  res.send(checkProcessAndClusterId("Clustering Approch in Nodejs"));
});

// envoking blocking statement
app.get("/blocking", (req, res) => {
  delay(5000); // 5sec
  res.send(checkProcessAndClusterId("Its hugely blocking API"));
});

// Clustering
console.log("New Instance of nodejs/cluster begins.....");
if (cluster.isPrimary) {
  // master process
  console.log("Master started....");
  // manuel forking
  cluster.fork(); // 1st worker
  cluster.fork(); // 2nd worker
  console.log("Workers Count: ", Object.keys(cluster.workers).length);
} else {
  // workers process
  console.log(`Worker ${cluster.worker.id} started...`);
  app.listen(port, () => console.log(`---> On port ${port}`));
}
