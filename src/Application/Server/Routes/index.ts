import { Router } from "express";

import {
  JWT,
  MockOldCreditCardRepo,
  MockOldLoanRepo,
  MockOldUserRepo,
  MockUserRepo,
  OldCreditCardRepo,
  OldLoanRepo,
  OldUserRepo,
  PrismaOldCreditCardRepo,
  PrismaOldLoanRepo,
  PrismaOldUserRepo,
  PrismaUserRepo,
  UserRepo,
} from "@/Adapter";
import {
  CTRLGetUserData,
  CTRLRegisterOldCreditCard,
  CTRLRegisterOldLoan,
  CTRLRegisterOldUser,
  CTRLRegisterUser,
  UCGetUserData,
  UCRegisterOldCreditCard,
  UCRegisterOldLoan,
  UCRegisterOldUser,
  UCRegisterUser,
} from "@/Domain/UseCase";

import { AuthHandler } from "../Middleware/AuthHandler";

let oldUserRepo: OldUserRepo = new MockOldUserRepo();
let oldCreditCardRepo: OldCreditCardRepo = new MockOldCreditCardRepo(
  oldUserRepo
);
let oldLoanRepo: OldLoanRepo = new MockOldLoanRepo(oldUserRepo);
let userRepo: UserRepo = new MockUserRepo();

if (process.env.NODE_ENV !== "test") {
  oldUserRepo = new PrismaOldUserRepo();
  oldCreditCardRepo = new PrismaOldCreditCardRepo();
  oldLoanRepo = new PrismaOldLoanRepo();
  userRepo = new PrismaUserRepo();
}

const auth = new JWT();
const authHandler = new AuthHandler(auth);

const registerUser = new UCRegisterUser(userRepo);
const { handle: handleRegisterUser } = new CTRLRegisterUser(registerUser, auth);

const registerOldUser = new UCRegisterOldUser(oldUserRepo);
const { handle: handleRegisterOldUser } = new CTRLRegisterOldUser(
  registerOldUser,
  auth
);

const registerOldCreditCard = new UCRegisterOldCreditCard(
  oldCreditCardRepo,
  oldUserRepo
);
const { handle: handleRegisterOldCreditCard } = new CTRLRegisterOldCreditCard(
  registerOldCreditCard
);

const registerOldLoan = new UCRegisterOldLoan(oldLoanRepo, oldUserRepo);
const { handle: handleRegisterOldLoan } = new CTRLRegisterOldLoan(
  registerOldLoan
);

const getUserData = new UCGetUserData(
  oldUserRepo,
  oldCreditCardRepo,
  oldLoanRepo
);
const { handle: handleGetUserData } = new CTRLGetUserData(getUserData, auth);

const router = Router();

router.route("/users").post(handleRegisterUser);

router.route("/old/users").post(handleRegisterOldUser);

router
  .route("/old/credit-cards")
  .post(authHandler.handle, handleRegisterOldCreditCard);

router.route("/old/loans").post(handleRegisterOldLoan);

router.route("/users/data").get(authHandler.handle, handleGetUserData);

export default router;
