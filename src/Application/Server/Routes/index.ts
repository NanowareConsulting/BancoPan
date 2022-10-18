import { Router } from "express";

import { PrismaUserRepo } from "@/Adapter";
import {
  CTRLApplyForOldCreditCard,
  CTRLApplyForOldLoan,
  CTRLGetOldCreditCards,
  CTRLGetOldLoans,
  CTRLGetOldUser,
  CTRLLogInOldUser,
  CTRLRegisterOldUser,
  CTRLRegisterUser,
  UCRegisterUser,
} from "@/Domain";

import { AuthHandler } from "../Middleware/AuthHandler";

const router = Router();

router.post("/register-old-user", new CTRLRegisterOldUser().handle);
router.post(
  "/apply-for-old-credit-card",
  AuthHandler,
  new CTRLApplyForOldCreditCard().handle
);
router.get("/get-old-user", AuthHandler, new CTRLGetOldUser().handle);
router.get(
  "/get-old-credit-card",
  AuthHandler,
  new CTRLGetOldCreditCards().handle
);
router.post(
  "/apply-for-old-loan",
  AuthHandler,
  new CTRLApplyForOldLoan().handle
);
router.get("/get-old-loans", AuthHandler, new CTRLGetOldLoans().handle);
router.post("/login-old-user", new CTRLLogInOldUser().handle);

// Dependency Injection for new system

const userRepo = new PrismaUserRepo();
const registerUser = new UCRegisterUser(userRepo);

router.post(
  "/register-user",
  AuthHandler,
  new CTRLRegisterUser(registerUser).execute
);

export default router;
