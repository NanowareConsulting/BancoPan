import { Router } from "express";

import { CTRLRegisterUser } from "@/Adapter";
import { MockUserRepository } from "@/Adapter/Driven/Repository/User/mock";
import { UCRegisterUser } from "@/Domain";

const userRepo = new MockUserRepository();

const registerUser = new UCRegisterUser(userRepo);
const { handle: handleRegisterUser } = new CTRLRegisterUser(registerUser);

const router = Router();

router.post("/register", handleRegisterUser);

export default router;
