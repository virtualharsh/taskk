const express = require('express')
const dovenv = require('dotenv')

dovenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.get('/',(req,res)=>{
  res.send('Hello World');
})

app.listen(PORT , (err)=>{
  if(err) console.log(err);
  else console.log(`Server running : http://localhost:${PORT}`);
})