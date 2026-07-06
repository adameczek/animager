"use server"

import bcrypt from "bcryptjs"
import {PrismaClient} from "@/generated/prisma/client";
import {PrismaLibSql} from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
})

const prisma = new PrismaClient({adapter})

export async function registerUser(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    if (!email || !password) return {error: "Missing email or password"}

    const exists = await prisma.user.findUnique({where: {email}})
    if (exists) return {error: "User with this email already exists"}

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    return {success: "User has been registered!"}
}