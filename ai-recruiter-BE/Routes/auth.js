// Routes/auth.js
import express from "express";
import { loginWithGoogle } from "../Controllers/auth.js";

const authRoute = express.Router();

authRoute.post("/google", loginWithGoogle);

export default authRoute;