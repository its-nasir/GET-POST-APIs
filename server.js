require("dotenv").config()
const express=require("express")
const app=express()
const port=process.env.PORT
const router=require("./router/index")

app.use(express.json())
app.use("/",router)

app.listen(port,()=>{
        console.log(`your server listen port No ${port}`);
})