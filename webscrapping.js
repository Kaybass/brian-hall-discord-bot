/*
NOT IMPLEMENTED YET
 */

//web scrapping
//https://scotch.io/tutorials/scraping-the-web-with-node-jsn
/*
tutorial i got this from
https://www.codementor.io/johnnyb/how-to-write-a-web-scraper-in-nodejs-du108266t
*/ 
var cheerio = require('cheerio');
const request = require("tinyreq");
const cheerioReq = require("cheerio-req");

var game = "fuck"
game = game.replace(/ /g,'+')
var baseUrl = "http://store.steampowered.com/search/?snr=1_4_4__12&term="
console.log(baseUrl + game)

cheerioReq(baseUrl+game, (err, $) => {
    /*
    bundles can have appid
    all this that are not packages have appid
    
    */
    console.log($('.search_result_row').attr("data-ds-packageid"));  //http://store.steampowered.com/search/?snr=1_bundle_4__12&term=grand+theft+auto
    console.log($('.search_result_row').attr("data-ds-bundleid"));  //http://store.steampowered.com/bundle/2533/
    console.log($('.search_result_row').attr("data-ds-appid")) //is fal all singler games
});

var intPage = "373420";
var base2Url = "http://store.steampowered.com/app/"
var urll = base2Url + intPage
console.log(urll)

cheerioReq(urll, (err, $) => {
    /*
    bundles can have appid
    all this that are not packages have appid
    */
    $('.app_tag').each(function(i, elem) {
        console.log($(this).text())
    });
    console.log("ya")
});

