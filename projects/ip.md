---
layout: page
published: true
---

<h1>IPv4 Validator</h1>
<form onsubmit="isValidIP(); return false">
  <p>
    <label for="ip" style="width: 100px;">IP: </label>
    <input id="ip" name="ip" type="ip" size="32">
  </p>
  <input type="submit"/>
</form>

<div id="validator" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;"></div>
<script>
  var f = document.forms[0];

  function isValidIP() {

    var validator = document.querySelector('#validator');

    var result = /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|$)){4}$/.test(f.ip.value);
   
    window.setTimeout(_ => {
      validator.innerHTML = result ? "Valid format" : "Invalid format"
    })
  }
</script>


<h1>IPv4 Generator</h1>
<form onsubmit="generateIP(); return false">
  <p>
    <input type="submit"/>
  </p>
</form>

<div id="out" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;"></div>
<script>
  function randomIP() {         
    return Math.floor(Math.random() * 256);
  }

  function generateIP() {

    var out = document.querySelector('#out');

    var result = `${randomIP()}.${randomIP()}.${randomIP()}.${randomIP()}`
   
    window.setTimeout(_ => {
      out.innerHTML = result
    })
  }
</script>
