import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to my app");
});

app.listen(3000, () => console.log("server is running on port 3000"));
