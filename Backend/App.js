const express = require(`express`);
const app = express();

let Port = 3000;

app.listen(Port, console.log(`listening to port 3000`));

app.use(express.static(`Backend/Public`));
