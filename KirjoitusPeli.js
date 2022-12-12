//Sanat
var elaimet = [
// ä = &auml; ö = &ouml;
"kissa","koira","m&auml;yr&auml;","opossumi","possu",
"sika", "lehm&auml;", "hevonen", "aasi", "kana", "kukko",
"lintu", "talitiainen", "korppi", "harakka", "kotka", "tikka",
"punatulkku", "kala", "ahven", "lohi", "silakka", "hai", "valas",
"delfiini",				
]
var paikat = [
"talo", "koti", "maja", "m&ouml;kki", "kaupunki", "kyl&auml;",
"maapallo", "maa", "meri", "j&auml;rvi", "lampi", "kota",
]
var verbit = [
"olla", "juosta", "k&auml;vell&auml;", "hyp&auml;t&auml;", "tuoda", "vied&auml;",
"pest&auml;", "piest&auml;", "uida", "taistella", "tapella", "kinastella", "yritt&auml;&auml;",
"nukkua", "lev&auml;t&auml;", "soittaa", "pelata", "leikki&auml;", "kutsua", "h&auml;&auml;t&auml;&auml;",
"uhrata", "luovuttaa", "edisty&auml;", "erist&auml;&auml;", "erikoistua", "ehdottaa", "esitt&auml;&auml;",
"iloita", "inhota", "istua", "ostaa", "odottaa", "olettaa", "ohjata", "aloittaa", "astua", "altistaa",
"ajaa", "ratsastaa", "auttaa", "ankkuroida", "antautua", "antaa" 
]
var adjektiivit = [
"punainen", "sininen", "vihre&auml;", "keltainen", "musta", "valkoinen", "harmaa", "pinkki", "purppura",
"violetti", "oranssi", "valoisa", "pime&auml;", "nopea", "hidas", "matala", "korkea", "pieni", "iso",
"suuri", "lyhyt", "eloisa", "energinen", "eloton", "uusi", "vanha", "k&auml;ytetty",
]

var sanat = elaimet.concat(paikat).concat(verbit).concat(adjektiivit);
console.log(sanat);
//Lisätään jokaiseen sanaa loppuun välilyönti,
//jotta sanan kirjoitettu tulee painaa välilyöntiä.
for (var i = 0; i < sanat.length;i++){
	sanat[i] = sanat[i].concat(" ");
}
//Pisteet on kaikista loppuun asti kirjoite
var pisteet = 0;
//Holder osoittaa tällä hetkellä kirjoituksessa olevasta sanasta tulevat pisteet.
var pisteHolder = 0;

//Aikaa kirjoittaa on 60 sekuntia.
var aika = 0;

//HTML elementit
var kirjoitettava = document.getElementById("kirjoitettava");
var kirjoitus = document.getElementById("kirjoitus");
var points = document.getElementById("points");
var typegame = document.getElementById("typegame");
var timer = document.getElementById("timer");
var score = document.getElementById("score");
var playarea = document.getElementById("PlayArea");
//Kertoo tämän hetkisen sanan indeksin, jotta sama sana ei tule kahteen kertaan.
var kysymysNum = -1;

function HidePage(){
	playarea.style.paddingTop  = "125px";
	typegame.hidden = true;
	startButton.hidden = false;
}

function CalculateTime(){
	timer.innerHTML = "Time: " + aika;
	aika--;
	if(aika > 0){
		setTimeout(CalculateTime, 1000);
	}
	else{ //Aika loppui
		//Summataan pisteet ja holderit
		pisteet = pisteet + pisteHolder;
		timer.innerHTML = "Aika loppui";
		score.innerHTML = "Character per second: " + (pisteet / 60);
		HidePage();
	}
}

function UnhidePage(){
	playarea.style.paddingTop  = "20px";
	typegame.hidden = false;
	startButton.hidden = true;
}

function StartTimer(){
	score.innerHTML = "";
	
	aika = 60;
	UnhidePage();
	kirjoitus.focus();
	kirjoitus.select();
	CalculateTime();
}

function KirjoitaPisteet(){
	points.innerHTML = "Points: " + (pisteet + pisteHolder);
}

function UusiSana(){
	//Aina uuden sanan valitessa on hyvä kirjoittaa pisteet.
	KirjoitaPisteet();
	//Randomisoidaan uusi sana, ja toistetaan randomisointia kunnes tulee uusi sana.
	var num = Math.floor((Math.random()*sanat.length));
	while (kysymysNum == num){
		num = Math.floor((Math.random()*sanat.length));
	}
	//Tallennetaan kysymys indeksi.
	kysymysNum = num;
	//Kirjoitetaan sana ja tyhjennetään kirjoitus kenttä.
	kirjoitettava.innerHTML = sanat[num];
	kirjoitus.value = "";
}

UusiSana(); //Kutsutaan heti alkuun kerran

//Kutsutaan aina kun käyttäjä tekee muutoksen kirjoitukseen.
function Tarkista(){		
	pisteHolder = 0; //Resetoidaan heti alkuunsa
	//Jos sana on täysin oikein
	if(kirjoitus.value == kirjoitettava.innerHTML){
		//Lisätään pisteet ja valitaan uusi sana.
		pisteet += kirjoitus.value.length;
		pisteHolder = 0;
		UusiSana();
		return;
	}
	
	// ----- Tarkistetaan oikein kirjoitus ----- //
	var kirjoituksenpituus = kirjoitus.value.length;
	var oikein = true;
	//Vertaa kirjoitusta ja kirjoitettavaa ja laskee että kuinka monta on kirjoitettu oikein
	for (var i = 0; i < kirjoituksenpituus; i++){
		pisteHolder += 1;
		if(kirjoitettava.innerHTML[i] != kirjoitus.value[i]){
			oikein = false;
			pisteHolder -= 1; //Väärästä kirjaimesta ei saa pisteitä
			break;
		}
	}
	//Teksti muuttuu punaiseksi, jos väärin
	if(oikein == false){
		kirjoitettava.style.color = "#ff0000";
	}
	else{
		//Muulloin tavallinen musta
		kirjoitettava.style.color = "white";
	}
	KirjoitaPisteet(); //Kirjoitetaan pisteet, jotta sanasta saa pisteitä vaikka sana ei olisi valmis.
}
function myFunction() {
	//alert('Hello');
}