const express = require('express')
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose")


const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/notes', require('./routes/noteRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

mongoose.connect(process.env.MONGO_URL,{
    UseNewUrlParser:true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Db connection successful")
}).catch((err) =>{
    console.log("Db not connect")
} )

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))