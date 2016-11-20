---
layout: page
published: true
---

<h1>Double or Die</h1>

You have a 1/6 chance to die each time you try to double your score. You can save your current score or you can continue going to keep going higher. If you die, you lose your current score. Try to get the highest possible score.

<center>

<div id="highscore" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;">Highscore = 1</div>

<div id="current-score" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;">Score = 1</div>

<button onclick="double()">Double</button>

<button onclick="save()">Save</button>

</center>

<button onclick="reset()">Reset</button>

<script>

  var score = 1;
  var highscore = 1;

  function reset(){
    highscore = 1;
    document.querySelector('#highscore').innerHTML = "Highscore = " + highscore;

  }

  function save(){
    var output = document.querySelector('#highscore');

    window.setTimeout(_ => {
      if (score > highscore){
        highscore = score;
        output.innerHTML = "Highscore = " + score;
      }
      score = 1;
      document.querySelector('#current-score').innerHTML = "Score = " + score;
    })
  }

  function double(){
    if (Math.random() >= 0.8){
      score = 1;
    }
    else{
      score *= 2;
    }
    window.setTimeout(_ => {
      document.querySelector('#current-score').innerHTML = "Score = " + score;
    })
  }

</script>
