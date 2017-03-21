const cheerioReq = require("cheerio-req");

/*
got to get 
promises working
https://www.promisejs.org/ 

http://www.datchley.name/es6-promises/


//web scrapping
//https://scotch.io/tutorials/scraping-the-web-with-node-jsn
/*
tutorial i got this from
https://www.codementor.io/johnnyb/how-to-write-a-web-scraper-in-nodejs-du108266t

tutorial on promises
https://www.youtube.com/watch?v=104J7_HyaG4
*/ 



var error = function(error){
    console.log("noo")
}

module.exports.getSteamIdFromName = function(gameString) {
    gameString = gameString.replace(/ /g,'+')
    var baseUrl = "http://store.steampowered.com/search/?snr=1_4_4__12&term="
    var url =  baseUrl + gameString ;

    return new Promise(function(resolve, reject){

   
        cheerioReq(url, (err, $) => {
            /*//////////////////////////////////////////////////
            /    bundles can have appid
            /    all this that are not packages have appid
            //////////////////////////////////////////////////*/
            packageId = $('.search_result_row').attr("data-ds-packageid");
            bundleId = $('.search_result_row').attr("data-ds-bundleid");
            appId = $('.search_result_row').attr("data-ds-appid")
            //console.log($('.search_result_row').attr("data-ds-packageid"));  //http://store.steampowered.com/search/?snr=1_bundle_4__12&term=grand+theft+auto
            //console.log($('.search_result_row').attr("data-ds-bundleid"));  //http://store.steampowered.com/bundle/2533/
            //console.log($('.search_result_row').attr("data-ds-appid"))     //is fal all singler games

            if(appId != undefined && bundleId == undefined){
                console.log("everthing all good");
                resolve(appId);
            }
            else{
                reject("bad title");
            }
            
        })
    });
};



module.exports.getTagsFromSteamId = function(steamId){
    var baseUrl = "http://store.steampowered.com/app/";
    return new Promise(function(resolve, reject){
        cheerioReq(baseUrl + steamId, (err, $) => {
            
            listOfTags = [];
            $('.app_tag').each(function(i, elem) {
                tag = $(this).text().trim().replace(/[^\w\s]/gi, '')
                
                if(tag != ''){
                    listOfTags.push(tag);
                }  
            });
            resolve(listOfTags);
        });
    });
}

module.exports.getTagsFromName = function(name){
    return new Promise(function(resolve, reject){
        module.exports.getSteamIdFromName(name).then((data) =>{
            module.exports.getTagsFromSteamId(data).then((tag)=>{
                deferred.resolve(tag)
            })
        }).catch((error) =>{
            console.log(error)
        })
    });
}

