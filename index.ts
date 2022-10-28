import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import filesRouter from "./src/files/files.router";
import { koreaTimezone } from "./src/commons/in-memory-map";
import "./src/preload";

console.log(new Date(Date.now() + koreaTimezone).toISOString());

dotenv.config();

function required(key: string) {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`'${key}' env not found!`);
  }
  return value;
}

function optional(key: string) {
  const value = process.env[key];
  return value;
}

const app = express();
const port = required("BASE_PORT");
const dbID = optional("DB_ID");
const dbPW = optional("DB_PW");
const dbEndpoint = required("DB_ENDPOINT");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connect");
});

if (dbID && dbPW) {
  mongoose.connect(
    `mongodb://${dbID}:${dbPW}@${dbEndpoint}/tsv-to-json?authSource=admin&authMechanism=SCRAM-SHA-1`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} else {
  mongoose.connect(`mongodb://${dbEndpoint}/tsv-to-json`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", filesRouter);

app.listen(port, () => {
  console.log(`Express app has been open for port ${port}!`);
});
