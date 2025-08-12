const express =require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const PORT = process.env.PORT ||3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("MongoDB 연결 성공"))
        .catch((err)=>console.log("연결 실패",err))



// route
const postRoutes = require("./routes/postRoutes")
app.use("/api/posts",postRoutes)

const express =require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const PORT = process.env.PORT ||3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("MongoDB 연결 성공"))
        .catch((err)=>console.log("연결 실패",err))



// route
const postRoutes = require("./routes/postRoutes")
app.use("/api/posts",postRoutes)


app.listen(PORT,()=>{
  console.log('서버 실행중')
})

app.listen(PORT,()=>{
  console.log('서버 실행중')
})
