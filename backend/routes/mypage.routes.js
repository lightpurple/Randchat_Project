import { Router } from "express";
import validate from "../middleware/validate.js";
import Mypage from "../controllers/mypage.controllers.js";

export const path = "/mypage";
export const router = Router();

router.post(
    "/mypage/change_password",
    validate.isLoggedin,
    Mypage.changePasswd
);
router.get("/mypage", validate.isLoggedin, Mypage.myPageShow);
router.put("/mypage", validate.isLoggedin, Mypage.myPagePut);
router.delete("/mypage", validate.isLoggedin, Mypage.myPageDelete);
