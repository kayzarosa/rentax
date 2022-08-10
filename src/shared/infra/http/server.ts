import app from "./app";
import "@database/index";

app.listen(3333, () => {
  console.log("Server is running!");
});
