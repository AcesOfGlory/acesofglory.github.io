---
layout: page
title: Projects
subtitle: A list of projects I've made
---

Have a look at my [Github](https://github.com/AcesOfGlory).

- [Genetic Algorithm Simulator](/projects/genetic-algorithm) - post [here](https://acesofglory.github.io/13-11-2016-genetic-algorithm/)
- [Maze Generator & Solver](/projects/maze-generator) - post [here](https://www.samnayak.com/01-12-2016-maze-generator-solver/)
- [Coordinates Validator](/projects/coordinates)
- [IP Validator](/projects/ip)
- [Caesar Cipher](/projects/caesar-cipher)
- [Case Identifier & Converter](/projects/case-converter)
- [Periodic Table Encoder & Decoder](/projects/periodic-table)
- [Countdown Game](/projects/countdown)
- [Chinese Zodiac](/projects/chinese-zodiac)
- [Base Converter](/projects/base-converter)
- [Stopwatch](/projects/stopwatch)
- [Imageboard](/projects/imageboard)
- [Sudoku](/projects/sudoku)
- [Rock, Paper, Scissors](/projects/rock-paper-scissors)
- [Blackjack](/projects/blackjack)
- [Fifteen Puzzle](/projects/fifteen-puzzle)
- [Fortune Cookie Clicker](/projects/fortune-cookie-clicker)
- [Double or Die](/projects/double-or-die)
- [Hangman](/projects/hangman)
- [Unit Converter](/projects/unit-converter)
- [Sorting Algorithms](/projects/sorting-algorithms)
- [Random Strawpoll](/projects/random-strawpoll)
- [RGB Converter](/projects/rgb)
- [Typing Test](/projects/typing-test)
- [Random Word](/projects/random-word)
- [Magic Eight Ball](/projects/eight-ball)
- [Wordsearch Maker](/projects/wordsearch-maker)
- [Probability Generator](/projects/probability-generator)
- [Random Pokemon](/projects/random-pokemon)
- [Word Generator](/projects/word-generator)
- [Scrabble Score](/projects/scrabble-score)
- [Shitpost Generator](/projects/shitpost-generator)
- [Integer English](/projects/integer-english)
- [Date Calculator](/projects/date-calculator)


<button onclick="myFunction()">Random</button>

<script type="text/javascript">
  function myFunction() {
    var arr = [], l = document.links;
    for(var i=0; i<l.length; i++) {
      arr.push(l[i].href);
    }
    arr = arr.filter(x => /https:\/\/acesofglory.github.io\/projects\/\w+/.test(x))
    var random = Math.floor(Math.random() * arr.length)
    window.open(arr[random])
  }
  
</script>


