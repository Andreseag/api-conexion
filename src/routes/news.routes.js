import { Router } from "express";
import {createNews, getNews, getNewsId, deleteNewsId, updateNewsId} from "../controllers/news.controllers.js";

const router = Router();



router.get("/", getNews);
router.get("/:id", getNewsId);
router.post("/", createNews);
router.patch("/:id", updateNewsId);
router.delete("/:id", deleteNewsId);




export default router;