var cheerio = require('cheerio')
var request = require('request')
var _ = require('lodash')

var page = 1
var keywords = 'metaderm'

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

    rankLong = rankLong.slice(7, 8) //removes letters before rank
    rankLong = parseInt(rankLong) //converts rank string to number
    var rankAdjust = rankLong + 1 //adds one to adjust for count starting at 0

    if (val.attribs['data-asin'] == 'B00BCPTH6U')
      console.log(`The ASIN ${ASIN} is rank ${rankAdjust} for the search term: ${keywords}`)

  }

}



/*  
var metadermASINS = ['B00BCPTH6U', 'B00F2LJVBQ', 'B00B9JTITK', 'B00F2LTMTW', 'B00FQ0RQR4', 'B00BCNIIVM']


function productList() {
  
  for (var i = 0; i < metadermASINS.length; i++)
  return metadermASINS[i]
  
}

productList()*/