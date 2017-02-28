Settings = require("./settings.json")

webScrappingMod = require("./webScrappingMod.js")


webScrappingMod.getSteamIdFromName("ICEY").then((data) =>{
    console.log("got completed")
    console.log(data)

    webScrappingMod.getTagsFromSteamId(data).then((data)=>{
        console.log(data)
    })
}).catch((error) =>{
    console.log(error)
})

