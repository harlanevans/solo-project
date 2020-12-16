const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'))
})

app.listen(3000)