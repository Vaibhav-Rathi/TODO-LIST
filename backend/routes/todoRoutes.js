import express from "express";
import { todoCreateSchema, updateTodoSchema } from "../database/schema.js";
import { PrismaClient } from "@prisma/client";
import authenticateUser from "../middleware/middleware.js";

const prisma = new PrismaClient();
const router = express.Router();

router.use(authenticateUser);

router.post('/create', async (req, res) => {
    const data = todoCreateSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json({ message: 'Invalid todo data' });
    }
    const userId = req.userId;
    const { title, description } = data.data;
    try {
        const todo = await prisma.todo.create({
            data: { title, description, userId },
        });

        res.json({ msg: "Todo created!", todo });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error (Database Error)" });
    }
});

router.get('/read', async (req, res) => {
    const id = req.query.id;
    const parsedId = parseInt(id);
    if (!parsedId || isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid or missing 'id' query parameter." });
    }
    const todo = await prisma.todo.findUnique({where : {id : parsedId}});
    if (!todo){
        return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ msg: "todo read!", todo});
});

router.get ('/readAll', async (req, res) =>{
    const todos = await prisma.todo.findMany({where : {userId : req.userId}})
    if (!todos){
        res.status(404).json({msg : "No todos found with this userId."})
    }
    res.status(200).json({msg : "All todos", todos});
})

router.delete('/delete', async (req, res) => {
    const id = req.query.id;
    const parsedId = parseInt(id);

    if (!parsedId || isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid or missing 'id' query parameter." });
    }
    try {
        const todo = await prisma.todo.delete({ where: { id: parsedId } });
        res.json({ msg: "Todo deleted successfully!", todo });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Todo not found with this id." });
        }
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

router.patch('/edit', async (req, res) => {
    const id = req.query.id; 
    const updates = updateTodoSchema.safeParse(req.body); 
    if (!updates.success) {
        return res.status(400).json({ message: 'Invalid todo data' });
    }
    const parsedId = parseInt(id);
    if (!parsedId || isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid or missing 'id' query parameter." });
    }
    if (!parsedId || isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid or missing 'id' query parameter." });
    }
    try {
        const updatedTodo = await prisma.todo.update({
            where: { id: parsedId },
            data: updates.data,
        });
        res.json({ msg: "Todo updated successfully!", todo: updatedTodo });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Todo not found with this id." });
        }
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Failed to update todo. Please try again." });
    }
});

router.patch('/mark-done', async (req, res) => {
    const id = req.query.id; 
    const userId = req.userId; 

    if (!id) {
        return res.status(400).json({ message: "Todo ID is required" });
    }
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid Todo ID" });
    }
    try {
        const todo = await prisma.todo.findUnique({
            where: { id: parsedId },
        });
        if (!todo || todo.userId !== userId) {
            return res.status(404).json({ message: "Todo not found or access denied" });
        }
        const updatedTodo = await prisma.todo.update({
            where: { id: parsedId },
            data: { done: !todo.done },
        });
        res.json({ message: "Todo marked", todo: updatedTodo });
    } catch (error) {
        console.error("Error marking todo as done:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;
