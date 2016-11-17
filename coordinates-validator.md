---
layout: page
title: Coordinates Validator
---

<script>
  (function isValidCoordinates(coordinates){
    console.log(/^-?0*(([1-8]?\d)(\.\d*)?|90(\.0*)?), -?0*(([1-9]?\d|1[0-7]\d)(\.\d*)?|180(\.0*)?)$/.test(coordinates));
  })("123.123")
</script>


<form action="action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey"><br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse"><br><br>
  <input type="submit" value="Submit">
</form>
