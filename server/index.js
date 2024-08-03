import app from "./app.js";
import { connectDb } from "./config/db.js";

const port = process.env.PORT || 5000;

connectDb();
app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});
