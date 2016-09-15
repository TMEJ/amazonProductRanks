var cheerio = require('cheerio')
var request = require('request')
var _ = require('lodash')


var keywordsInput = process.argv[2]

//for (var k = 0; k <= keywordsList.length - 1; k++) {


for (var i = 1; i <=10; i++){

var metadermASINS = ['B00BCPTH6U', 'B00F2LJVBQ', 'B00B9JTITK', 'B00F2LTMTW', 'B00FQ0RQR4', 'B00BCNIIVM']



_.map(metadermASINS, test)


function test(ASINS) {

  var page = i
  var keywords = keywordsInput

  var url = 'https://www.amazon.com/mn/search/'

  var options = {
    url: url,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding':'gzip, deflate, sdch, br',
      'Accept-Language':'en-US,en;q=0.8',
      'Avail-Dictionary':'DgmIdlSw',
      'Cache-Control':'no-cache',
      'Connection':'keep-alive',
      'Host':'www.amazon.com',
      'Pragma':'no-cache',
      'Referer':'https://www.amazon.com/',
      'Upgrade-Insecure-Requests':'1',
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    },
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

};
}



