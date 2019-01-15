$(document).ready(function(){

    let characters = {
        "Batman": {
            name: "Batman",
            health: 125,
            attack: 15,
            imageUrl: "https://media.giphy.com/media/10cLU1HbFzOHYc/giphy.gif",
            enemyAttack: 10
        },
        "Superman": {
            name:"Superman",
            health: 150,
            attack: 10,
            imageUrl: "https://media.giphy.com/media/FiBzv5FRE85PO/giphy.gif",
            enemyAttack: 5,

        },
        "Flash": {
            name:"Flash",
            health: 150,
            attack: 10,
            imageUrl: "https://media.giphy.com/media/4blB72WTnjXzy/giphy.gif",
            enemyAttack: 5,

        },

        "Joker": {
            name:"Joker",
            health: 50,
            attack: 5,
            imageUrl: "https://media.giphy.com/media/AwoDg0wJImOjK/giphy.gif",
            enemyAttack: 5,

        },

        "Doomsday": {
            name:"Doomsday",
            health: 180,
            attack: 15,
            imageUrl: "http://33.media.tumblr.com/06264b189c9d5005e69341a3f74e86dc/tumblr_n2g5s2jCfQ1rp7jnqo3_r1_250.gif",
            enemyAttack: 20,

        },

        "Zoom": {
            name:"Zoom",
            health: 150,
            attack: 10,
            imageUrl: "https://media.giphy.com/media/k6QsLa115d77G/giphy.gif",
            enemyAttack: 5,

        },
    }

    var attacker;
    var villians = [];
    var heroes;
    var turnCounter =1;
    var killCounts =0;

    function renderCharacter(character, renderArea) {
        console.log("Inside renderCharacter")
        console.log(character)
        var characterDiv = $("<div class='character col-4' data-name='" + character["name"] + "'>");
        var characterName = $("<div class='characterName'>").text(character["name"])
        var characterImage = $("<img class='characterImage'>").attr("src", character["imageUrl"])
        var characterHealth = $("<div class='characterHealth'>").text(character["health"])

        characterDiv.append(characterName).append(characterImage).append(characterHealth)
        $(renderArea).append(characterDiv)
    }


    /*dict = {
        "a": 1,
        "b": 2,
        "c": 3
    }
    array = [1,2,3]

    for(var i = 0; i < array.length; i++){
        array[i]
    }
    for(var k in dict){
        console.log(k)
        console.log(dict[k]);
        //dict["a"] --> 1
        //dict["b"] --> 2
        //dict["c"] --> 3
    }*/

    function startGame () {
        for (var key in characters){
            console.log(key)
            renderCharacter(characters[key], "#characterSection");
        }
    }

    startGame()
    
  
    function updateCharacter(character, renderArea) {
        $(renderArea).empty();
        renderCharacter(character, renderArea)
    }

    function renderVillains(villians) {
        for (var i= 0; i<villians.length; i++)
        {
            renderCharacter(villians[i], "#villiansCharacterSection")
        }

    }

    function restartGame(results) {
        var restart = $("<button>Restart</button>").click(function(){
            location.reload();

            var gameState = $("<div>").text(results);

            $("body").append(gameState);
            $("body").append(restart);


        })
    }

    function renderMessage(message) {
        var gameMessage = $("#gameMessage");
        var newMessage = $("<div>").text(message)
        gameMessage.append(newMessage);
    }

    function clearMessage() {
        var gameMessage= $("#gameMessage")
        gameMessage.text("")
    }  
    
    $("#characterSection").on("click", ".character", function(){
        var name = $(this).attr("data-name")

        if(!attacker){
            attacker = characters[name];

            for(key in characters){
                if(key !== name){
                    villians.push(characters[key])
                }
            }

           $("#characterSection").hide()

           updateCharacter(attacker, "#selectedCharacterSection")
           renderVillains(villians)
        }
    })

    $("#villiansCharacterSection").on("click", ".character", function(){
        var name = $(this).attr("data-name")
        console.log(name)
        if($("#opponentSection").children().length === 0){
            opponent = characters[name];
            updateCharacter(opponent, "#opponentSection")

            $(this).remove()
            clearMessage();
        }

    })

    //document.getElementById("attackButton")
    //document.getElementsByClassName("attackButton")

    //$(".attackButton")

    // $(function () {
    //     $('#escondido').removeClass('hidden');
    // }

    $("#attackButton").on("click", function() {
        if($("#opponentSection").children().length !== 0) {
            var attackMessage = "You attacked " + opponent["name"] + " for " + attacker["attack"] * turnCounter + " damage.";
            var counterAttackMessage = opponent["name"] + "attacked you back for " + opponent["enemyAttack"] + " damage.";
            clearMessage();


            opponent["health"] -= attacker["attack"] * turnCounter;

            if(opponent["health"] > 0){
                updateCharacter(opponent, "#opponentSection")
                renderMessage(attackMessage);
                renderMessage(counterAttackMessage)


                attacker["health"] -= opponent["enemyAttack"];

                updateCharacter(attacker, "#selectedCharacterSection")

                if(attacker["health"] <= 0){
                    clearMessage();
                    alert("YOU GOT YOUR BUTT KICKED - GAME OVER")
                    location.reload()
                    //restartGame("You died.... Game OVer");
                    //$("#attackButton").off("click")
                }


            }
            else {
                $("#opponentSection").empty()
                var gameStateMessage = "YOU DEFEATED " + opponent["name"] + ", CHOOSE ANOTHER CHALLENGER";
                renderMessage(gameStateMessage);

                killCounts++;
                alert(killCounts + " CHALLENGER BUTT KICKED")
                console.log(villians)

                if(killCounts == villians.length){
                    //clearMessage();
                    //$("#attackButton").off("click")
                    alert("GAME OVER YOU WON!!")
                    location.reload()
                    //restartGame("You Won!!! Game Over!!!")
                }

            }

            turnCounter++;

        }
        else {
            clearMessage();
            renderMessage("REALLY WHO ARE YOU GOING TO FIGHT YOUR SELF? CHOOSE CHALLENGER NOW!!")
        }
    })




})






