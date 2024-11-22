import zod from "zod";

export const userCreateSchema = zod.object({
    name : zod.string(),
    email : zod.string().email(),
    password : zod.string(), 
})

export const todoCreateSchema = zod.object({
    title : zod.string(),
    description : zod.string(),
})

export const loginSchema = zod.object({
    email : zod.string(),
    password : zod.string()
})

export const updateTodoSchema = zod.object({
    title : zod.string(),
    description : zod.string(),
})