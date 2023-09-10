import { Router } from "express";
import {createNews, getNews, getNewsId } from "../controllers/news.controllers.js";

const router = Router();



router.get("/", getNews);
router.get("/:id", getNewsId);
router.post("/", createNews);




export default router;