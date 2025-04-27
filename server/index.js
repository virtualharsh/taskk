const express = require('express')

dovenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.listen(PORT , (err)=>{
  if(err) console.log(err);
  else console.log(`Server running : ${PORT}`);
})