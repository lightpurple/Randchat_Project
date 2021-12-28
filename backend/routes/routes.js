import { Router } from "express";

export const path = "";
export const router = Router();

import * as authRouter from "./auth.routes.js";
import * as mypageRouter from "./mypage.routes.js";
import * as chatRouter from "./chat.routes.js";

router.use(authRouter.path, authRouter.router);
router.use(mypageRouter.path, mypageRouter.router);
router.use(chatRouter.path, chatRouter.router);
