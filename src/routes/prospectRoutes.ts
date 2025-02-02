import express from "express";
import { ProspectController } from "../controllers/PropectsControllers";
import { validateProspect } from "../middlewares/ValidationMiddleware";

const prospectRouter = express.Router();
const controller = new ProspectController();

prospectRouter.get("/", controller.getAll);
prospectRouter.get("/:id", controller.getById);
prospectRouter.post("/", validateProspect, controller.create);
prospectRouter.put("/:id", controller.update);
prospectRouter.delete("/:id", controller.delete);

export default prospectRouter;
