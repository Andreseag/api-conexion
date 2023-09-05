import { Router } from "express";
import { createTableUserApp, createNewUserApp, truncateTableUserApp, dropTableUserApp } from "../controllers/devdb.controllers.js";

const router = Router();

router.post("/create/table/userapp", createTableUserApp);
router.post("/insert/table/userapp", createNewUserApp);
router.post("/truncate/table/userapp", truncateTableUserApp);
router.post("/drop/table/userapp", dropTableUserApp);

export default router;