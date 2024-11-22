import express from "express";
import bcrypt from "bcrypt";
import { userCreateSchema, loginSchema } from "../database/schema.js";
import { PrismaClient } from "@prisma/client";
import authenticateUser from "../middleware/middleware.js"

const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', async (req, res) => {
    const data = loginSchema.safeParse(req.body);
    if (!data.success) {
    return res.status(400).json({ message: 'Invalid login user data' });
    }
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.cookie('user', { id: user.id, name: user.name, email: user.email }, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", user});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/create', async (req, res) => {
    const data = userCreateSchema.safeParse(req.body);

    if (!data.success) {
        return res.status(400).json({ message: 'Invalid user data' });
    }

    const { name, email, password } = data.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const usercheck = await prisma.user.findUnique({ where: { email } });
        if (usercheck) {
            return res.status(404).json({ message: "This email is associated to an account already" });
        }
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.cookie('user', { id: user.id, name: user.name, email: user.email }, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/edit-profile', authenticateUser, async (req, res) => {
    const userId = req.userId;
    const { name, password } = req.body;

    if (!name && !password) {
        return res.status(400).json({ message: "No details provided for update" });
    }
    const updates = {};
    if (name) updates.name = name;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.password = hashedPassword;
    }
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updates,
        });
        res.json({ message: "User details updated successfully", user: updatedUser });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "User not found" });
        }
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/logout', async (req, res) => {
    await res.clearCookie('user', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.json({ message: "Logout successful" });
});

router.get('/me', authenticateUser, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
