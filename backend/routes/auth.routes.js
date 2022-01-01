import { Router } from "express";
import validate from "../middleware/validate.js";
import Auth from "../controllers/auth.controllers.js";

export const path = "/auth";
export const router = Router();

router.post("/signup", validate.register, Auth.signUp);
router.post("/login", Auth.login);
