import express from "express";
import morgan from "morgan";
import cors from "cors"
const app = express();
import dev from "./routes/devdb.routes.js";
import login from "./routes/login.routes.js";
import news from "./routes/news.routes.js";
import media from "./routes/media.routes.js";
import structure from "./routes/structure.routes.js";
import userapp from "./routes/userapp.routes.js";


// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Routes
app.use("/dev", dev);
app.use("/login", login);
app.use("/structure", structure);
app.use("/media", media);
app.use("/news", news);
app.use("/userapp", userapp);

app.use((req, res, next) => {
    res.status(404).json({ message: "ruta no encontrada" });
});



//inicia servidor
app.set('port', process.env.PORT || 5200);
app.listen(app.get('port'),()=>{
    console.log('servidor corriendo en el puerto',app.get('port'));
});