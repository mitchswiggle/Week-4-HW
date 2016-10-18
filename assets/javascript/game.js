$(document).ready(function(){

// Variables
var chars = {
c1: ["Dwayne Wade", "assets/images/Wade.jpg", 160, 15],
c2: ["Shaq", "assets/images/Shaq.jpg", 120, 8],
c3: ["Micheal Jordan", "assets/images/Jordan.jpg", 200, 30],
c4: ["Kobe Bryant", "assets/images/Kobe.jpg", 170, 22]
};
var isAttacker = false;
var isDefender = false;
var attHealth = 0;
var defHealth = 0;
var attDamage = 0;
var defDamage = 0;
var attDamageAdd = 0;

// Functions
function setupChars () {
for (var x in chars) {
var playerBox = $('<div>');
var playerImage = $('<img>');
var playerName = $('<div>');
var playerHealth = $('<div>');
playerBox.addClass('charBox');
playerBox.attr('data-state', "allChars");
playerBox.attr('data-health', chars[x][2]);
playerBox.attr('data-damage', chars[x][3]);
playerImage.addClass('charImage');
playerImage.attr('src', chars[x][1]);
playerImage.attr('alt', chars[x][0]);
playerName.addClass('charName');
playerName.html(chars[x][0]);
playerHealth.addClass('charHealth');
playerHealth.html(chars[x][2]);

$("#allChars").append(playerBox.append(playerImage, playerName, playerHealth));
};
}

function chooseChar () {
$("#allChars > .charBox").on('click', function(){

if ($(this).data('state') == "allChars" && isAttacker == false) {
$(this).hide();
$(this).attr('data-state', "att");
$("#att").append($(this).show());
isAttacker = true;
attHealth = parseInt($(this).data('health'));
attDamage = parseInt($(this).data('damage'));
attDamageAdd = attDamage;

$("#allChars > .charBox").hide();
$("#allChars > .charBox").attr('data-state', "allEnemies");
$("#allChars > .charBox .charImage").css({"background-color": "yellow", "border-color": "black"});
$("#allEnemies").append($("#allChars > .charBox").show());
}
else if ($(this).data('state') == "allEnemies" && isDefender == false) {
$(this).hide();
$(this).attr('data-state', "def");
$("#def").empty();
$("#def").append($(this).show());
$("#def.charBox .charImage").css({"background-color": "blue", "border-color": "green"});
$("#def.charBox .charName").css("color", "white");
$("#def.charBox .charHealth").css("color", "white");
$("#def").show();
isDefender = true;
defHealth = parseInt($(this).data('health'));
defDamage = parseInt($(this).data('damage'));
$("#fightResult").html("<p></p>");
}
});
}

function resetGame () {
isAttacker = false;
isDefender = false;
attHealth = 0;
defHealth = 0;
attDamage = 0;
defDamage = 0;
attDamageAdd = 0;

$("#att").empty();
$("#allEnemies").empty();
$("#def").empty();
$("#fightResult").html("");
$("#restartButton").hide();
}

// Play Game

$("#restartButton").hide();
setupChars();
chooseChar();

$("#attButton").on('click', function(){
if (isAttacker && isDefender){
attHealth -= defDamage;
$("#att.charBox .charHealth").html(attHealth);

if (attHealth > 0) {
defHealth -= attDamage;
$("#def.charBox .charHealth").html(defHealth);
}

if (attHealth > 0 && defHealth > 0){
$("#fightResult").html("<p>You attacked " + $("#def.charBox .charName").text() +
" for " + attDamage + " damage." + "<br>" + $("#def.charBox .charName").text() +
" attacked you back for " + defDamage + " damage.</p>");
attDamage += attDamageAdd;
}
else if (attHealth <= 0) {
isAttacker = false;
$("#fightResult").html("<p>You've lost...GAME OVER!!!</p>");
$("#restartButton").show();
}
else if (defHealth <= 0) {
$("#def").hide();
isDefender = false;

if ($("#allEnemies").html() == "") {
isAttacker = false;
$("#fightResult").html("<p>You Won!!!! GAME OVER!!!</p>");
$("#restartButton").show();
}
else {
$("#fightResult").html("<p>You have defeated " + $("#def.charBox .charName").text() +
", you can choose to play another AllStar.</p>");
}
}
}
else if (isAttacker && !isDefender){
$("#fightResult").html("<p>No enemy here.</p>");
}
});

$('#restartButton').on('click', function() {
resetGame();
setupChars();
chooseChar();
});
});