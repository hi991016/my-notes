/* eslint-disable no-undef */
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const fs = require('fs')

app.get('/', function (request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    data = data.replace(/\$OG_TITLE/g, 'Home Page')
    data = data.replace(/\$OG_DESCRIPTION/g, 'Home page description')
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png')
    response.send(result)
  })
})

app.get('/projects/jincup-anew', function (request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    data = data.replace(/\$OG_TITLE/g, 'jincup anew ｜ PROJECTS ｜ anew inc.')
    data = data.replace(/\$OG_DESCRIPTION/g, 'Jincup page description')
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png')
    response.send(result)
  })
})

app.use(express.static(path.resolve(__dirname, './build')))

app.get('*', function (request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  response.sendFile(filePath)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
