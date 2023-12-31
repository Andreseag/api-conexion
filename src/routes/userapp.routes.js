import { Router } from "express";
import {createUserapp,getUserapp,deleteUserapp} from "../controllers/userapp.controller.js";

const router = Router();

router.get("/", getUserapp);
router.post("/", createUserapp);
router.delete("/:id", deleteUserapp);

export default router;