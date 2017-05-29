class Building {

	constructor(name, cost, increment=0, time=1) {
		this._group = "Building";
		this._amount = 0;
		this._name = name;
		this._cost = cost;
		this._increment = increment;
		this._time = time;
	}
}

document.getElementById("cookie-image").ondragstart = function() { return false; };

var cookies;
var cps;
var hasBought = false;
var currentCookie;
var buildings;

if(typeof(Storage) !== "undefined") {
	if (localStorage.cookies) {
		cookies = Number(localStorage.cookies);
	}
	else {
		cookies = 0;
	}
	if (localStorage.cps)
		cps = Number(localStorage.cps);
	else
		cps = 0;

	if (localStorage.purchases && 5 == 6){
		buildings = JSON.parse(localStorage.getItem("purchases"));
	}
	else {
		buildings = [
			new Building("Cursor", 10, 0.25),
			new Building("Grandma", 100, 1),
			new Building("Farm", 500, 8),
			new Building("Mine", 10000, 20),
			new Building("Factory", 50000, 100),
			new Building("Bank", 100000, 250),
			new Building("Temple", 250000, 1000),
			new Building("Wizard Tower", 500000, 2500),
			new Building("Shipment", 1000000, 7500),
			new Building("Alchemy Lab", 5000000, 50000),
			new Building("Portal", 10000000, 150000),
			new Building("End Game", 100000000000)
		];
	}
}

updateCookies();

setInterval(autosave, 30000);
setInterval(updateCookies, 2000);

buildings.forEach(item => {
	var para = document.createElement("BR");
	var card = document.createElement("input");
	card.type = "button";
	card.onclick = _ => buy(item);
	card.id = item._name;
	card.value = `${item._name}: ${item._amount} (costs ${item._cost})`;
	document.getElementById("buildings-shop").appendChild(card);
  document.getElementById("buildings-shop").appendChild(para);
});


function clickCookie(){
	cookies++;
	updateCookies();
}

function buy(item){
	if (!hasBought){
		hasBought = true;
		loop();
	}
	if (cookies >= item._cost){
		if (item._name === "End Game"){
			alert("Congratulations!");
		}

		item._amount++;
		cookies -= item._cost;

		if (item._group == "Building"){
			item._cost = Math.floor(item._cost * 1.3);

			cps += item._increment/item._time;

			updateCookies();
			autosave();

			document.getElementById(item._name).value = `${item._name}: ${item._amount} (costs ${item._cost})`;
		}
	}
}

function loop(){
	cookies += (document.hidden ? cps : cps / 100)
	//cookies += cps/100
	document.getElementById("cookie-amount").innerHTML = `Cookies = ${Math.floor(cookies)}`;
	setTimeout(loop, 10);
}

function updateCookies(){
	localStorage.cookies = cookies;
	document.title = `${Math.floor(cookies)} Cookies - Fortune Cookie Clicker | Sam Nayak`;
	document.getElementById("cps-amount").innerHTML = `CPS = ${cps}`;
	document.getElementById("cookie-amount").innerHTML = `Cookies = ${Math.floor(cookies)}`;
}

function autosave(){
	localStorage.cookies = cookies;
	localStorage.cps = cps;
	localStorage.setItem("purchases", JSON.stringify(buildings));
}
