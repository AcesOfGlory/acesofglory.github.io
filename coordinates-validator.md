---
layout: page
title: Coordinates Validator
published: true
---

<form onsubmit="isValidCoordinates(); return false">
  <p>
    <label for="coordinates" style="width: 100px;">Coordinates: </label>
    <input id="coordinates" name="coordinates" type="coordinates" size="32">
  </p>
  <input class="btn js-textareacopybtn" type="submit" name="btn" value="Calculate" />
</form>

<div id="out" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;">
<script>
  var f = document.forms[0];

  function isValidCoordinates() {

    var btn = f.btn;
    var out = document.querySelector('#out');

    var password = /^-?0*(([1-8]?\d)(\.\d*)?|90(\.0*)?), -?0*(([1-9]?\d|1[0-7]\d)(\.\d*)?|180(\.0*)?)$/.test(f.coordinates.value);
    

    btn.disabled = true;
    btn.value = 'Wait...';

    window.setTimeout(function(res="") {
      var t2 = ((new Date()).getTime());
      out.innerHTML = 'Time: <b>'+t2+' ms</b><br>Master password input length: 'password'<br><span style="color:cornflowerblue; font-weight:bold">Succesfully copied password to clipboard.</span>
      btn.disabled = false;
      btn.value = 'Calculate';
      var copyTextarea = document.querySelector('#res');
      copyTextarea.select();
    })
  }
</script>
