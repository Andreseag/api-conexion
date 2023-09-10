import { Router } from "express";
import { 
    createTableUserApp, createNewUserApp, truncateTableUserApp, dropTableUserApp,
    createTableMedia, truncateTableMedia, dropTableMedia,
    createTableNews, truncateTableNews, dropTableNews

} from "../controllers/devdb.controllers.js";

const router = Router();

router.post("/create/table/userapp", createTableUserApp);
router.post("/insert/table/userapp", createNewUserApp);
router.post("/truncate/table/userapp", truncateTableUserApp);
router.post("/drop/table/userapp", dropTableUserApp);

router.post("/create/table/media", createTableMedia);
router.post("/truncate/table/media", truncateTableMedia);
router.post("/drop/table/media", dropTableMedia);

router.post("/create/table/news", createTableNews);
router.post("/truncate/table/news", truncateTableNews);
router.post("/drop/table/news", dropTableNews);

export default router;