/*
Made by Bartłomiej Strama

https://bstrama.com
*/
var turn = "x",
    numberTurn = true,
    field = [];
const columns = 5,
      rows = 5;

function onLoad(){
  // mode()
  let papiez = Math.floor(Math.random() * 2137 + 1);
  console.log(papiez);
}

function mainFunction(field0, field1) {
  let sid = document.getElementById(`${field0}${field1}`);
  console.log(parseInt(`${field0}${field1}`), sid)
  sid.setAttribute('onclick', '')
  field[[field0, field1]] = numberTurn;
  console.log(field[[field0, field1]])
  sid.innerHTML = `<p>${turn}</p>`;
  numberTurn = !numberTurn;
  turn = numberTurn ? "x" : "o";
  document.getElementById("now").innerHTML = "Tura: " + turn;
  rowAndColumnValidation();
}

function winValidation() {
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
    for (let fieldId of document.getElementsByClassName("box")) {
      fieldId.setAttribute("onClick", "#");
    }
  }else {
    for (let fieldId of [0,1,2,3,4,5,6,7,8]) {
      document.getElementById(fieldId).setAttribute("onClick", `mainFunction(${fieldId}`);
      document.getElementById(fieldId).innerHTML = "";
      turn = "x";
      document.getElementById("now").innerHTML = "Tura x";
      numberTurn = true;
      field[fieldId] = null;
    }
  }
}

function rowAndColumnValidation(rowOrColumn) {
  for (let i0 = 0; i0 < columns; i0++){
    for (let i1 = 0; i1 < rows - 2; i1++){
      let fieldSet = [ field[[i0, i1]], field[[i0 + rowOrColumn, i1 + rowOrColumn]], field[[i0 + 2, i1 +2]] ]
      if(fieldSet.indexOf(1) + 1){
        return [true].concat(fieldSet);
      }else if(fieldSet.indexOf(0) + 1){
        return [false].concat(fieldSet);
      }
    }
  }
}