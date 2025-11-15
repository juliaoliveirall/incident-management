import express from "express";
import userRoutes from "./routes/usersRoutes";
import incidentRoutes from "./routes/incidentRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/incidents", incidentRoutes);

export default app;
