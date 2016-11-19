---
layout: page
published: true
---

<h1>Element Decoder</h1>

<h2>Elements -> Symbol</h2>

<p>E.g. HeAl -> Helium Aluminium</p>

<form onsubmit="elementDecode1(); return false">
  <p>
    <input id="decode1" size="50">
  </p>
  <input type="submit"/>
  <h3>Output: </h3>
</form>

<div id="decode-output1" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;"></div>

<script>
  var f = document.forms[0];
  const ELEMENTS = {'Te': 'Tellurium', 'V': 'Vanadium', 'Ta': 'Tantalum', 'Rb': 'Rubidium', 'Tb': 'Terbium', 'K': 'Potassium', 'Kr': 'Krypton', 'Md': 'Mendelevium', 'Cn': 'Copernicium', 'Be': 'Beryllium', 'O': 'Oxygen', 'F': 'Fluorine', 'Nb': 'Niobium', 'Tl': 'Thallium', 'Ne': 'Neon', 'N': 'Nitrogen', 'Rg': 'Roentgenium', 'Ag': 'Silver', 'Rn': 'Radon', 'Ba': 'Barium', 'Cu': 'Copper', 'Dy': 'Dysprosium', 'Po': 'Polonium', 'Mg': 'Magnesium', 'Pt': 'Platinum', 'Cr': 'Chromium', 'Uuo': 'Ununoctium', 'Ho': 'Holmium', 'Cm': 'Curium', 'Os': 'Osmium', 'Ir': 'Iridium', 'S': 'Sulfur', 'Am': 'Americium', 'Uus': 'Ununseptium', 'Lv': 'Livermorium', 'Se': 'Selenium', 'C': 'Carbon', 'Yb': 'Ytterbium', 'Es': 'Einsteinium', 'Re': 'Rhenium', 'Sr': 'Strontium', 'Ni': 'Nickel', 'He': 'Helium', 'Sc': 'Scandium', 'P': 'Phosphorus', 'Ds': 'Darmstadtium', 'Sn': 'Tin', 'Ce': 'Cerium', 'Pr': 'Praseodymium', 'Pm': 'Promethium', 'Zr': 'Zirconium', 'As': 'Arsenic', 'Th': 'Thorium', 'Lu': 'Lutetium', 'Si': 'Silicon', 'Pd': 'Palladium', 'Pa': 'Protactinium', 'B': 'Boron', 'Uut': 'Ununtrium', 'Ge': 'Germanium', 'Er': 'Erbium', 'Zn': 'Zinc', 'Mn': 'Manganese', 'W': 'Tungsten', 'Db': 'Dubnium', 'Al': 'Aluminium', 'H': 'Hydrogen', 'Mo': 'Molybdenum', 'Cf': 'Californium', 'At': 'Astatine', 'Pb': 'Lead', 'Hs': 'Hassium', 'Fm': 'Fermium', 'Ac': 'Actinium', 'Ru': 'Ruthenium', 'Cl': 'Chlorine', 'Mt': 'Meitnerium', 'Sm': 'Samarium', 'Xe': 'Xenon', 'Fe': 'Iron', 'Nd': 'Neodymium', 'Hg': 'Mercury', 'No': 'Nobelium', 'Co': 'Cobalt', 'Uup': 'Ununpentium', 'Cd': 'Cadmium', 'Pu': 'Plutonium', 'Lr': 'Lawrencium', 'Bh': 'Bohrium', 'Eu': 'Europium', 'Br': 'Bromine', 'Ca': 'Calcium', 'Au': 'Gold', 'Ar': 'Argon', 'Ti': 'Titanium', 'Gd': 'Gadolinium', 'Rh': 'Rhodium', 'Fl': 'Flerovium', 'In': 'Indium', 'Rf': 'Rutherfordium', 'Bk': 'Berkelium', 'Np': 'Neptunium', 'Na': 'Sodium', 'Ra': 'Radium', 'Fr': 'Francium', 'I': 'Iodine', 'Cs': 'Caesium', 'Tc': 'Technetium', 'Y': 'Yttrium', 'Sg': 'Seaborgium', 'Ga': 'Gallium', 'Bi': 'Bismuth', 'La': 'Lanthanum', 'Hf': 'Hafnium', 'U': 'Uranium', 'Sb': 'Antimony', 'Tm': 'Thulium', 'Li': 'Lithium'}

  function solution(word){
    var find = word.trim().replace(" ", "").match(/[A-Z][a-z]*/g)
    try{
      return find.map(x => ELEMENTS[x]).join(" ")
    }
    catch(error){
      return "Doesn't exist"
    }
  }
  
  function elementDecode1() {

    var decodeOutput1 = document.querySelector('#decode-output1');

    var result = solution(f.decode1.value);
   
    window.setTimeout(_ => {
      decodeOutput1.innerHTML = result
    })
  }
</script>


<h2>Symbols -> Elements</h2>
<p>E.g. Helium Aluminium -> HeAl</p>

<form onsubmit="elementDecode2(); return false">
  <p>
    <input id="decode2" size="32">
  </p>
  <input type="submit"/>
  <h3>Output: </h3>
</form>

<div id="decode-output2" style="margin-top: 10px; padding: 10px 5px; color: #444; line-height: 1.5;"></div>

<script>
  var f = document.forms[0];
  const ELEMENTS = {'Te': 'Tellurium', 'V': 'Vanadium', 'Ta': 'Tantalum', 'Rb': 'Rubidium', 'Tb': 'Terbium', 'K': 'Potassium', 'Kr': 'Krypton', 'Md': 'Mendelevium', 'Cn': 'Copernicium', 'Be': 'Beryllium', 'O': 'Oxygen', 'F': 'Fluorine', 'Nb': 'Niobium', 'Tl': 'Thallium', 'Ne': 'Neon', 'N': 'Nitrogen', 'Rg': 'Roentgenium', 'Ag': 'Silver', 'Rn': 'Radon', 'Ba': 'Barium', 'Cu': 'Copper', 'Dy': 'Dysprosium', 'Po': 'Polonium', 'Mg': 'Magnesium', 'Pt': 'Platinum', 'Cr': 'Chromium', 'Uuo': 'Ununoctium', 'Ho': 'Holmium', 'Cm': 'Curium', 'Os': 'Osmium', 'Ir': 'Iridium', 'S': 'Sulfur', 'Am': 'Americium', 'Uus': 'Ununseptium', 'Lv': 'Livermorium', 'Se': 'Selenium', 'C': 'Carbon', 'Yb': 'Ytterbium', 'Es': 'Einsteinium', 'Re': 'Rhenium', 'Sr': 'Strontium', 'Ni': 'Nickel', 'He': 'Helium', 'Sc': 'Scandium', 'P': 'Phosphorus', 'Ds': 'Darmstadtium', 'Sn': 'Tin', 'Ce': 'Cerium', 'Pr': 'Praseodymium', 'Pm': 'Promethium', 'Zr': 'Zirconium', 'As': 'Arsenic', 'Th': 'Thorium', 'Lu': 'Lutetium', 'Si': 'Silicon', 'Pd': 'Palladium', 'Pa': 'Protactinium', 'B': 'Boron', 'Uut': 'Ununtrium', 'Ge': 'Germanium', 'Er': 'Erbium', 'Zn': 'Zinc', 'Mn': 'Manganese', 'W': 'Tungsten', 'Db': 'Dubnium', 'Al': 'Aluminium', 'H': 'Hydrogen', 'Mo': 'Molybdenum', 'Cf': 'Californium', 'At': 'Astatine', 'Pb': 'Lead', 'Hs': 'Hassium', 'Fm': 'Fermium', 'Ac': 'Actinium', 'Ru': 'Ruthenium', 'Cl': 'Chlorine', 'Mt': 'Meitnerium', 'Sm': 'Samarium', 'Xe': 'Xenon', 'Fe': 'Iron', 'Nd': 'Neodymium', 'Hg': 'Mercury', 'No': 'Nobelium', 'Co': 'Cobalt', 'Uup': 'Ununpentium', 'Cd': 'Cadmium', 'Pu': 'Plutonium', 'Lr': 'Lawrencium', 'Bh': 'Bohrium', 'Eu': 'Europium', 'Br': 'Bromine', 'Ca': 'Calcium', 'Au': 'Gold', 'Ar': 'Argon', 'Ti': 'Titanium', 'Gd': 'Gadolinium', 'Rh': 'Rhodium', 'Fl': 'Flerovium', 'In': 'Indium', 'Rf': 'Rutherfordium', 'Bk': 'Berkelium', 'Np': 'Neptunium', 'Na': 'Sodium', 'Ra': 'Radium', 'Fr': 'Francium', 'I': 'Iodine', 'Cs': 'Caesium', 'Tc': 'Technetium', 'Y': 'Yttrium', 'Sg': 'Seaborgium', 'Ga': 'Gallium', 'Bi': 'Bismuth', 'La': 'Lanthanum', 'Hf': 'Hafnium', 'U': 'Uranium', 'Sb': 'Antimony', 'Tm': 'Thulium', 'Li': 'Lithium'}

  function solution(word){
    var find = word.trim().replace(" ", "").match(/[A-Z][a-z]*/g)
    try{
      return find.map(x => ELEMENTS[x]).join(" ")
    }
    catch(error){
      return "Doesn't exist"
    }
  }
  
  function elementDecode2() {

    var decodeOutput2 = document.querySelector('#decode-output2');

    var result = solution(f.decode2.value);
   
    window.setTimeout(_ => {
      decodeOutput2.innerHTML = result
    })
  }
</script>


<h1>Element Encoder</h1>
