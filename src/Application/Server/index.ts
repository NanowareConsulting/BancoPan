import Express from "express";

import router from "./Routes";

const { NODE_ENV } = process.env;

export const app = Express();

app.use(Express.json());
app.use(router);

if (NODE_ENV !== "test") {
  app.listen(3333, () => {
    console.log("Server started on port 3333");
  });
}
