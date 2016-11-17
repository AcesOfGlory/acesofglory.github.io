---
layout: page
title: Coordinates Validator
---

<form onsubmit="calculate(); return false">
  <p>
    <label for="password" style="width: 100px;">Password:</label>
    <input id="password" name="password" type="password" size="32">
  </p>
  <input class="btn js-textareacopybtn" type="submit" name="btn" value="Calculate" />
</form>

<div id="out" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;">
<script>
  var f = document.forms[0];

  function calculate() {

    var btn = f.btn;
    var out = document.querySelector('#out');

    var password = f.password.value;

    btn.disabled = true;
    btn.value = 'Wait...';

    window.setTimeout(function(res) {
      var t2 = ((new Date()).getTime());
      out.innerHTML = 'Time: <b>'+t2+' ms</b><br>Master password input length: '+password.length+'<br>;
      btn.disabled = false;
      btn.value = 'Calculate';
    })
  }
</script>

