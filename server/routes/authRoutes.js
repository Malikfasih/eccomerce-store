import express from "express";
import {
  register,
  login,
  test,
  forgotPassword,
  updateProfile,
  getAllUsers,
} from "../controllers/auth.js";
import { isAdmin, requireSignIn } from "../middleware/auth.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", register);

//LOGIN || POST
router.post("/login", login);

//Forgot Password || POST
router.post("/forgot-password", forgotPassword);

//test routes
router.get("/test", requireSignIn, isAdmin, test);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth // is admin required
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/get-users", requireSignIn, isAdmin, getAllUsers);

//update profile
router.put("/profile", requireSignIn, updateProfile);

export default router;
