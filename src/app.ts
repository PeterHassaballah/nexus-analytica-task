import express, { json, urlencoded } from "express";

import compression from "compression";
import cors from "cors";
import { indexRoute } from "./routes/v1/index";

const app = express();

// parse json request body
app.use(json());
// gzip compression
app.use(compression());
// enable cors
app.use(cors());
// parse urlencoded request body
app.use(urlencoded({ extended: true }));
// v1 api routes
app.use("/v1", indexRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(res.status(404).send({ msg: "Not found" }));
});
// convert error to ApiError, if needed
// app.use(errorConverter);

// // handle error
// app.use(errorHandler);

export default app;