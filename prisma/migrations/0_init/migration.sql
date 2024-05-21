-- CreateTable
CREATE TABLE "personal_info" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "home_address" TEXT,
    "phone_number" VARCHAR(11) NOT NULL,
    "gender" VARCHAR(10),
    "profile_image" BYTEA,
    "next_of_kin" VARCHAR(50) NOT NULL,
    "emergency_contact" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100),

    CONSTRAINT "personal_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_info" (
    "personal_info_id" INTEGER NOT NULL,
    "department" VARCHAR(50) NOT NULL,
    "job_title" VARCHAR(50),
    "date_hired" DATE,
    "account_number" VARCHAR(15) NOT NULL,
    "card_number" VARCHAR(20),
    "position_status" VARCHAR(50),
    "approved" BOOLEAN,
    "salary" DECIMAL(12,2),

    CONSTRAINT "work_info_pkey" PRIMARY KEY ("personal_info_id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- AddForeignKey
ALTER TABLE "work_info" ADD CONSTRAINT "work_info_personal_info_id_fkey" FOREIGN KEY ("personal_info_id") REFERENCES "personal_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

