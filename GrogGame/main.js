var saveGame = localStorage.getItem('grogGameSave')

var gameData = {
    grog: 0,
    grogPerClick: 1,
    grogPerClickCost: 10,
    grogPotency: 30,
    lastTick: Date.now()
}

function update(id, content){
    document.getElementById(id).innerHTML = content;
}

function obtainGrog(){
    gameData.grog += gameData.grogPerClick
    update("grogObtained", format(gameData.grog, "scientific") + " Grog Obtained")
}

var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now()
    gameData.grog += gameData.grogPerClick + (diff / 1000)
    update("grogObtained", format(gameData.grog, "scientific") + " Grog Obtained")
}, 1000)

function buyGrogPerClick(){
    if (gameData.grog >= gameData.grogPerClickCost){
        gameData.grog -= gameData.grogPerClickCost
        gameData.grogPerClick += 1
        gameData.grogPerClickCost *= 2
        update("grogObtained", format(gameData.grog, "scientific") + " grog Obtained")
        update("perClickUpgrade", "Upgrade Grog (Currently LVL " + format(gameData.grogPerClick, "scientific") + ") Cost: " + format(gameData.grogPerClickCost, "scientific") + " Grog")
    }
}

function buyGrogPotency(){
    if (gameData.grog >= gameData.grogPotency){
        gameData.grog -= gameData.grogPotency
        gameData.grogPerClick += 3
        gameData.grogPotency *= 2
        update("grogObtained", format(gameData.grog, "scientific") + " grog Obtained")
        update("grogPotency", "Increase Grog Potency (Currently LVL " + format(gameData.grogPerClick, "scientific") + ") Cost: " + format(gameData.grogPotency, "scientific") + " Grog")
    }
}


var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("grogGameSave", JSON.stringify(gameData))
}, 15000)

function format(number, type) {
    let exponent = Math.floor(Math.log10(number))
    let mantissa = number / Math.pow(10, exponent)
    if (exponent < 3) return number.toFixed(1)
    if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
    if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

if (typeof saveGame.grog !== "undefined") gameData.grog = saveGame.grog;
if (typeof saveGame.grogPerClick !== "undefined") gameData.grogPerClick = saveGame.grogPerClick;
if (typeof saveGame.grogPerClickCost !== "undefined") gameData.grogPerClickCost = saveGame.grogPerClickCost;
if (typeof saveGame.grogPotency !== "undefined") gameData.grogPotency = saveGame.grogPotency;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;

function tab(tab){
    document.getElementById("obtainGrogMenu").style.display = "none"
    document.getElementById("shopMenu").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
}
tab("obtainGrogMenu")