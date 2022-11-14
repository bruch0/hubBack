import "./setup";
import app from "./app";

app.listen(process.env.PORT);
console.log("app is listening on", process.env.PORT);
