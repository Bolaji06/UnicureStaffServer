-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);
