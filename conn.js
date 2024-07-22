const mongoose = require('mongoose');

const mongouri=process.env.mongouri

mongoose.connect(mongouri).then(()=>{
    console.log("DATABASE CONNECTED✅");
}).catch((error)=>{
    console.log(" database connection failed ❌ ",error);
})
