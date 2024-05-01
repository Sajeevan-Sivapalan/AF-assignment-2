import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from 'cookie-parser';
import logger from "./utils/logger.mjs";
import databaseConnection from "./config/database.mjs";
import AuthRoute from "./routes/AuthRoute.mjs";
import UserRoute from "./routes/UserRoute.mjs";

const app = express();
const PORT = process.env.PORT || "8080";
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());

app.use("/", AuthRoute);
app.use("/user", UserRoute);

app.listen(PORT, () => {
    logger.info(`Server is up and running on port ${PORT}`);
    databaseConnection();
})

export default app;
