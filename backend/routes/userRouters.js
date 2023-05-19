import express from "express";
const router = express.Router();

import { register } from "../controllers/usersControllers.js";

// CREAT, REGISTER AND CONFIRM USERS 

router.post("/", register);


export default router;