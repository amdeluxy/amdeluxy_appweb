import express from "express";
const router = express.Router();

import { register, auth  } from "../controllers/usersControllers.js";

// CREAT, REGISTER AND CONFIRM USERS 

router.post("/", register); // create new users 
router.post("/login", auth );



export default router;