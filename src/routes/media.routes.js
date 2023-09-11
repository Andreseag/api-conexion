import { Router } from "express";
import {deleteMediaId, updateMediaId} from "../controllers/media.controllers.js";

const router = Router();

router.delete("/:id", deleteMediaId);
router.patch("/:id", updateMediaId);

export default router;