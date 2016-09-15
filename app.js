var cheerio = require('cheerio')
var request = require('request')
var _ = require('lodash')


for (var i = 1; i <=10; i++){

var metadermASINS = ['B00BCPTH6U', 'B00F2LJVBQ', 'B00B9JTITK', 'B00F2LTMTW', 'B00FQ0RQR4', 'B00BCNIIVM']

_.map(metadermASINS, test)


function test(ASINS) {

  var page = i
  var keywords = 'psoriasis'

  var url = 'https://www.amazon.com/mn/search/'

  var options = {
    url: url,
    qs: {
      rh: `aps, k:${keywords}`,
      page: page,
      keywords: keywords,
    }
  }

  request(options, requestCallback)

  function requestCallback(err, response, data) {
    if (err) {
      console.log('Oops!', err)
    } else {
      parsingTime(data)
    }
  }

  function parsingTime(data) {
    var $ = cheerio.load(data)

    var childs = $(' .s-result-list-hgrid').children()

    _.forEach(childs, getASINS)

    function getASINS(val) {

      var rankLong = val.attribs.id // gives rank of 
      var ASIN = val.attribs['data-asin'] //gives asins on page

      rankLong = rankLong.slice(7, 9) //removes letters before rank
      rankLong = parseInt(rankLong) //converts rank string to number
      var rankAdjust = rankLong + 1 //adds one to adjust for count starting at 0

      if (val.attribs['data-asin'] == ASINS)
        console.log(`The ASIN ${ASIN} is rank ${rankAdjust} for the search term: ${keywords} on page ${page}`)

    }

  }

}
}