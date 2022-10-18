-- CreateTable
CREATE TABLE "OldUser" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "OldUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OldCreditCard" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "exp_date" TIMESTAMP(3) NOT NULL,
    "user_cpf" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "OldCreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OldLoan" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "interest" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "user_cpf" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "OldLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "exp_date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "interest" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OldUser_cpf_key" ON "OldUser"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "OldUser_email_key" ON "OldUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OldCreditCard_number_key" ON "OldCreditCard"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_number_key" ON "CreditCard"("number");

-- AddForeignKey
ALTER TABLE "OldCreditCard" ADD CONSTRAINT "OldCreditCard_user_cpf_fkey" FOREIGN KEY ("user_cpf") REFERENCES "OldUser"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OldLoan" ADD CONSTRAINT "OldLoan_user_cpf_fkey" FOREIGN KEY ("user_cpf") REFERENCES "OldUser"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
