var cheerio = require('cheerio');
const request = require("tinyreq");
const cheerioReq = require("cheerio-req");



module.exports.getSteamIdFromName = function(gameString) {
    gameString = gameString.replace(/ /g,'+')
    var baseUrl = "http://store.steampowered.com/search/?snr=1_4_4__12&term="
    cheerioReq(baseUrl+gameString, (err, $) => {
        /*
        bundles can have appid
        all this that are not packages have appid
        */
        packageId = $('.search_result_row').attr("data-ds-packageid");
        bundleId = $('.search_result_row').attr("data-ds-bundleid");
        appId = $('.search_result_row').attr("data-ds-appid")
        console.log($('.search_result_row').attr("data-ds-packageid"));  //http://store.steampowered.com/search/?snr=1_bundle_4__12&term=grand+theft+auto
        console.log($('.search_result_row').attr("data-ds-bundleid"));  //http://store.steampowered.com/bundle/2533/
        console.log($('.search_result_row').attr("data-ds-appid"))     //is fal all singler games

        if(appId != undefined && bundleId == undefined){
            console.log("everthing all good")
        }
    });
};


module.exports.getTagsFromSteamId = function(steamId){
    var baseUrl = "http://store.steampowered.com/app/";
    cheerioReq(baseUrl + steamId, (err, $) => {
        /*//////////////////////////////////////////////////
        /    bundles can have appid
        /    all this that are not packages have appid
        //////////////////////////////////////////////////*/
        listOfTags = [];
        $('.app_tag').each(function(i, elem) {
            tag = $(this).text().trim().replace(/[^\w\s]/gi, '')
            if(a != ''){
                console.log(a);
                listOfTags.append(tag);
            }  
        });
        console.log("ya")
    });

}