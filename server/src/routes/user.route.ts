import express from "express";
import { getUser, handleEditProfile } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.put("/", handleEditProfile);

export default userRouter;
