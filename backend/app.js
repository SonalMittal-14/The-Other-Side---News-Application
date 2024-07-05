const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cors({
    origin: 'https://the-other-side-news-application-1e2e.vercel.app',
    // origin : "http://localhost:3000",
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/" , require("./routes/user.js"))
app.use("/" , require("./routes/article.js"))
app.use('/' , require("./routes/comment.js"))

module.exports = app;
