import express from "express";
const app = express();
import dev from "./routes/devdb.routes.js";
import login from "./routes/login.routes.js";
import news from "./routes/news.routes.js";
import structure from "./routes/structure.routes.js";

// Middlewares
app.use(express.json());

// Routes
app.use("/dev", dev);
app.use("/login", login);
app.use("/structure", structure);
app.use("/news", news);

app.use((req, res, next) => {
    res.status(404).json({ message: "ruta no encontrada" });
});


app.listen(5200)