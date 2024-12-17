import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateSignup } from "../middlewares/ValidationMiddleware";

const router = Router();
const userController = new UserController();

router.post("/signup", validateSignup, userController.createUser); // Middleware aqui
router.post("/login", userController.login);

export default router;
