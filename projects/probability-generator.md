---
layout: page
published: true
---

<h1>Probability Generator</h1>

<form>

	<input id="iterations" value=100 size=6 style="text-align:center;margin-left:4em;">

	<input id="wins" size=4 value=5 style="text-align:center;"/>
	<input id="loses" size=4 value=1 style="text-align:center;">

</form>


<button onclick="generateProbability()">Generate</button>


<div id=output></div>


<script type="text/javascript">

	function probability(win=5, lose=1, iterations=100){
		var total = [...Array(win)].map(_ => "Win").concat([...Array(lose)].map(_ => "Lose"));
		var countNum = [];

		for (var i = 1; i <= iterations; i++){
			var counter = ["Win"];
			while (total[Math.floor(Math.random() * total.length)] != "Win"){
				counter.push("Lose");
			}
			countNum.push(counter.length)
			//document.getElementById("output").innerHTML = `It took ${counter.length} iteration(s) to get a win`
		}

		const totalSum = countNum.reduce((x, y) => x+y, 0)
		const iterationLength = countNum.length
		const winCount = total.filter(x => x == "Win").length

		document.getElementById("output").innerHTML = `Iterations: ${iterations}` + "<br>" +
							      `Total iterations: ${totalSum}` + "<br>" + "<br>" +

													  `Average iterations: ${(totalSum / countNum.length).toFixed(3)}` + "<br>" +
													  `Expected iterations: ${(total.length / winCount).toFixed(3)}` + "<br>" + "<br>" +

													  `Odds: ${(total.filter(x => x == "Win").length * 100 / total.length).toFixed(3)}` + "<br>" + "<br>" +

													  `Maximum: ${Math.max(...countNum)}` + "<br>" +
														
													  `Minimum: ${Math.min(...countNum)}` + "<br>" +
												      `Range: ${Math.max(...countNum) - Math.min(...countNum)}`




	}

	function generateProbability(){
		var iterationAmount = parseInt(document.getElementById("iterations").value)
		var winAmount = parseInt(document.getElementById("wins").value)
		var loseAmount = parseInt(document.getElementById("loses").value)
		probability(winAmount, loseAmount, iterationAmount)
	}

</script>

