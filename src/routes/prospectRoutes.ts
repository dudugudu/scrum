import express from "express";
import { ProspectController } from "../controllers/PropectsControllers";
import { validateProspect } from "../middlewares/ValidationMiddleware";

const router = express.Router();
const controller = new ProspectController();

router.get("/prospects", controller.getAll);
router.get("/prospects/:id", controller.getById);
router.post("/prospects", validateProspect, controller.create);
router.put("/prospects/:id", controller.update);
router.delete("/prospects/:id", controller.delete);

export default router;
