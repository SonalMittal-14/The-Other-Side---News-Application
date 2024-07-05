const app = require("./app.js")
const connectDataBase = require("./db/index.js")
const dotenv = require("dotenv");
dotenv.config({path : "./.env"});

const PORT = process.env.PORT;
connectDataBase()
.then(()=>{
    app.listen(PORT ,()=>{
        console.log("http:localhost:" + PORT);
    })

})