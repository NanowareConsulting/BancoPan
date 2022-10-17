import cors from "cors";
import Express from "express";

import { ErrorHandler } from "./Middleware/ErrorHandler";
import router from "./Routes";

const { NODE_ENV, PORT } = process.env;

export const app = Express();

app.use(cors());
app.use(Express.json());
app.use(router);
app.use(ErrorHandler);

if (NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("Server started on port 3333");
  });
}
