---
layout: page
title: Coordinates Validator
---

<form onsubmit="calculate(); return false">
  <p>
    <label for="password" style="width: 100px;">Password:</label>
    <input id="password" name="password" type="password" size="32">
  </p>
  <p>
    <label for="keyword" style="width: 100px;">Keyword:</label>
    <input id="keyword" name="keyword" type="text" size="32">
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
    var keyword = f.keyword.value;

    btn.disabled = true;
    btn.value = 'Wait...';

    window.setTimeout(function() {
    try {
      var t1 = (new Date()).getTime();
      scrypt(password, keyword, {
      logN: 15,
      r: 8,
      p: 1,
      dkLen: 32,
      interruptStep: 0,
      encoding: "hex"
    },
    function(res) {
      var t2 = ((new Date()).getTime()-t1);
      out.innerHTML = 'Time: <b>'+t2+' ms</b><br>Master password input length: '+password.length+'<br><span style="color:cornflowerblue; font-weight:bold">Succesfully copied password to clipboard.</span> <textarea id="res">' + res + '</textarea>';
      btn.disabled = false;
      btn.value = 'Calculate';
      var copyTextarea = document.querySelector('#res');
      copyTextarea.select();
    }
  }
</script>

