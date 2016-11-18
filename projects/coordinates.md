---
layout: page
published: true
---

<h1>Coordinates Validator</h1>
<form onsubmit="isValidCoordinates(); return false">
  <p>
    <label for="coordinates" style="width: 100px;">Coordinates: </label>
    <input id="coordinates" name="coordinates" type="coordinates" size="32">
  </p>
  <input type="submit"/>
</form>

<div id="out" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;"></div>
<script>
  var f = document.forms[0];

  function isValidCoordinates() {

    var out = document.querySelector('#out');

    var result = /^-?0*(([1-8]?\d)(\.\d*)?|90(\.0*)?), -?0*(([1-9]?\d|1[0-7]\d)(\.\d*)?|180(\.0*)?)$/.test(f.coordinates.value);
   
    window.setTimeout(_ => {
      out.innerHTML = result ? "Valid format" : "Invalid format"
    })
  }
</script>

<h1>Coordinates Generator</h1>
<form onsubmit="generateCoordinates(); return false">
  <p>
    <input type="submit"/>
  </p>
</form>

<div id="generate" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;"></div>
<script>
  function generateIP() {

    var generate = document.querySelector('#generate');

    var result = Math.random() * (90 + 90) - 90 + ", " + Math.random() * (180 + 180) - 180;   
   
    window.setTimeout(_ => {
      generate.innerHTML = result
    })
  }
</script>
