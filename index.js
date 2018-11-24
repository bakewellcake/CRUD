var express = require('express')
var bodyParser = require('body-parser')
var db = require('./database')

var index = require('./routes/index')

var app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/public', express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)

app.use(function(error, req, res, next) {
	console.log(error)
	res.status(500).send(error)
})

app.listen(4401, function () {
	console.log('CRUD server started at port 4401...')
})