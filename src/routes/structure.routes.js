import { Router } from "express";
import {news} from "../controllers/structure.controller.js";

const router = Router();



router.get("/news/", news);




export default router;