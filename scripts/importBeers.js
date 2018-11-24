var request = require('request')
var cheerio = require('cheerio')
var async = require('async')
var db = require('../database')

request.get('https://www.beeradvocate.com/lists/uk/', function (res, res, body) {
    var $ = cheerio.load(body)
    var muted = $('.muted')

    async.eachLimit(muted, 10, function (data, done) {
        var row = $(data)[0]

        if (row.children.length > 1) {
            var name = $(row).prev().text()
            var company = $(row.children[1]).text()
            var style = $(row.children[3]).text()
            var percentage = row.children[4].data.replace(' | ', '').replace('%', '')
            var rating = $(row).parent().next().next().text()

            db.beer.findAll({
                where: {
                    name: name
                }
            }).then(function (searchBeer) {
                if (searchBeer.length === 0) {
                    db.beer.create({
                        name: name,
                        company: company, 
                        style: style,
                        percentage: percentage,
                        rating: rating
                    }).then(function () {
                        done()
                    })
                } else {
                    done()
                }
            })
        } else {
            done()
        }
    }, function () {
        console.log('\nDone')
        process.exit()
    })
})