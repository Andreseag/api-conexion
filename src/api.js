import express from "express";
const app = express();
import dev from "./routes/devdb.routes.js";
import login from "./routes/login.routes.js";

// Middlewares
app.use(express.json());

// Routes
app.use("/dev", dev);
app.use("/login", login);


app.listen(5200)