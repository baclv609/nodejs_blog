const express = require('express')
const app = express() // trả về 1 đối tượng app để xây dụng web 
const port = 3000 // cổng khi chạy

// định nghĩa router
app.get('/', (req, res) => {
  res.send('Hello World! chao ngay moi')
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})