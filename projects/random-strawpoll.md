---
layout: page
published: true
---

<h1>Random Strawpoll Generator</h1>
<form onsubmit="generateStrawpoll(); return false">
  <p>
    <input type="submit"/>
  </p>
</form>

<script>

  function generateStrawpoll(){
  
    var ranges = [Math.floor(Math.random() * (7424996)) + 1, Math.floor(Math.random() * (10798929 - 10000001 + 1)) + 10000001]
    var n = Math.random() >= 0.5 ? ranges[0] : ranges[1]

    window.open("http://www.strawpoll.me/" + n);
  }

</script>
