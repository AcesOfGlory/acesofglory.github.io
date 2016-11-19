---
layout: page
published: true
---

<h1>Case Identifier</h1>
<form onsubmit="caseIdentifier; return false">
  <p>
    <label for="case" style="width: 100px;">IP: </label>
    <input id="case" name="case" type="case" size="32">
  </p>
  <input type="submit"/>
</form>

<div id="identifier" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;"></div>
<script>
  var f = document.forms[0];
  
  function id(c_str) {
    if( /^([a-z]+([A-Z]{1}[a-z]+)+)$/.test(c_str) ) {
      return 'camel';
    }
    else if( /^([a-z]+-[a-z]+)+$/.test(c_str) ) {
      return 'kebab';
    }
    else if( /^([a-z]+_[a-z]+)+$/.test(c_str) ) {
      return 'snake';
    }
    return 'none';
  }

  function caseIdentifier() {

    var identifier = document.querySelector('identifier');

    var result = id(f.case.value);
   
    window.setTimeout(_ => {
      identifier.innerHTML = result
    })
  }
</script>


