import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
const PORT = 3001;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
}));


app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

app.get('/', (req, res) => {
    res.json({ msg: "TODO WEB PAGE" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
