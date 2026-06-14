-- Add the missing user name field so registration can persist and return user display names.
ALTER TABLE "User" ADD COLUMN "name" TEXT NOT NULL DEFAULT '';
