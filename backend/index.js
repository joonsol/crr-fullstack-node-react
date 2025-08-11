const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>{ 
    console.log("mongoDB 연결 성공")
      const { host, name } = mongoose.connection;
    console.log("mongoDB 연결 성공");
    console.log(`↳ Connected to host: ${host}, db: ${name}`); // ★어디에 저장되는지 확
  })
  .catch((err) => console.error("연결실패", err))



const postRoutes = require("./routes/postRoutes")
app.use("/api/posts", postRoutes)

app.listen(PORT, () => {
  console.log(`서버 실행 중 :http://localhost:${PORT}`)
})

