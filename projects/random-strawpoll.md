---
layout: page
published: true
---

<h1>Random Strawpoll Generator</h1>
<select id="key">
  <option value='1'>1</option>
  <option value='2'>2</option>
  <option value='3'>3</option>
  <option value='4'>4</option>
  <option value='5'>5</option>
  <option value='6'>6</option>
  <option value='7'>7</option>
  <option value='8'>8</option>
  <option value='9'>9</option>
  <option value='10'>10</option>
  <option value='11'>11</option>
  <option value='12'>12</option>
  <option value='13'>13</option>
  <option value='14'>14</option>
  <option value='15'>15</option>
  <option value='16'>16</option>
  <option value='17'>17</option>
  <option value='18'>18</option>
  <option value='19'>19</option>
  <option value='20'>20</option>
  <option value='21'>21</option>
  <option value='22'>22</option>
  <option value='23'>23</option>
  <option value='24'>24</option>
  <option value='25'>25</option>
  <option value='26'>26</option>
</select>

<button onclick="pollGenerator()">Generate</button>

<script>

  function generator(){
    const n = Math.floor(Math.random() * (10798929 - 2)) + 1
    const m = 7424996 <= n < 10000000 ? (Math.floor(Math.random() * (10798929 - 2)) + 7424998) % 7424997 : n
    window.open("http://www.strawpoll.me/"+m)
  }

  function pollGenerator() {
    const amount = parseInt(document.getElementById('key').value)
    for (let i = 0; i <= amount; i++){
      generator()
    }
  
  }
  
</script>

