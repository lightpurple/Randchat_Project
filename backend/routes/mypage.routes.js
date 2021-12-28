import { Router } from "express";
import validate from "../middleware/validate.js";
import Mypage from "../controllers/mypage.controllers.js";

export const path = "/mypage";
export const router = Router();

router.post("/change_password", validate.isLoggedin, Mypage.changePasswd);
router.get("/", validate.isLoggedin, Mypage.myPageShow);
router.put("/", validate.isLoggedin, Mypage.myPagePut);
router.delete("/", validate.isLoggedin, Mypage.myPageDelete);
