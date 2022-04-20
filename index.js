/*
Made by Bartłomiej Strama

https://bstrama.com
*/
let turn = "x",
    numberturn = true,
    field = [];

function onLoad(){
  mode()
}

function mainFunction(id) {
  let sid = document.getElementById(id);
  sid.onclick = '#';
  field[parseInt(id)] = numberturn;
  sid.innerHTML = turn;
  numberturn = !numberturn;
  turn = numberturn ? "x" : "o";
  document.getElementById("now").innerHTML = "Tura " + turn;
  tester();
}

function tester() {
  let set1 = new Set([
    rowAndColumnValidation(0,1,2,9, 3),
    rowAndColumnValidation(0,3,6,3, 1),
    rowAndColumnValidation(0,4,8,1,1),
    rowAndColumnValidation(2,4,6,1,1)])

  if (set1.has("1")) {
    endAndStart(true)
    document.getElementById("now").innerHTML = "Wygrał x";
  } else if (set1.has("0")) {
    endAndStart(true)
    document.getElementById("now").innerHTML = "Wygrał o";
  }
}

function endAndStart(rmOnClickOrAdd){
  if(rmOnClickOrAdd) {
    for (let fieldId of document.getElementsByClassName("field")) {
      fieldId.setAttribute("onClick", "#");
    }
  }else {
    for (let fieldId of [0,1,2,3,4,5,6,7,8]) {
      document.getElementById(fieldId).setAttribute("onClick", 'mainFunction(' + fieldId + ')');
      document.getElementById(fieldId).innerHTML = "";
      turn = "x";
      document.getElementById("now").innerHTML = "Tura x";
      numberturn = true;
      field[fieldId] = null;
    }
  }
}

function rowAndColumnValidation(id1, id2, id3, times, increment) {
  for (let i = 0; i < times; i+= increment) {
    if ([
        field[id1 + i],
        field[id2 + i],
        field[id3 + i]].every(n => n === true)) {
      return "1";
    } else if ([
        field[id1 + i],
        field[id2 + i],
        field[id3 + i]].every(n => n === false)) {
      return "0";
    }
  }
}

function mode() {
  let value = document.getElementById("mode").checked
  if(value) {
    document.body.style.backgroundColor = "rgba(0,0,0,0.64)"
    document.getElementById("main-div").style.backgroundColor = "#c7c7c7"
    document.getElementById("mode-label").innerHTML = "Default mode: "
  } else{
    document.body.style.backgroundColor = "#cfc"
    document.getElementById("main-div").style.backgroundColor = "rgba(77, 252, 252, 0.178)"
    document.getElementById("mode-label").innerHTML = "Dark mode: "
  }
}