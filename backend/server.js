import "./src/config/env.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const port = process.env.PORT || 8080;

connectDB(); 

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});