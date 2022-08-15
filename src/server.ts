import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";

export const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
