/*
Made by Bartłomiej Strama

https://bstrama.com
*/
let turn = "x",
    numberTurn = true,
    field = [];

function onLoad(){
  mode()
  let papiez = Math.floor(Math.random() * 2137 + 1);
  console.log(papiez);
}

function mainFunction(field0, field1) {
  let sid = document.getElementById(`${field0}${field1}`);
  sid.setAttribute('onclick', '')
  field[[field0, field1]] = numberTurn;
  sid.innerHTML = `<p>${turn}</p>`;
  numberTurn = !numberTurn;
  turn = numberTurn ? "x" : "o";
  document.getElementById("now").innerHTML = "Tura: " + turn;
  winValidation(field0, field1)
}

function winValidation(field0, field1) {
  let set = [
      rowAndColumnValidation(field0, field1)
  ]
  if (set.indexOf(true) + 1) {
    //endAndStart(true)
    document.getElementById("now").innerHTML = "Wygrał x";
  } else if (set.indexOf(false) + 1) {
    //endAndStart(true)
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
      document.getElementById(fieldId).setAttribute("onClick",
          `mainFunction(${fieldId}`);
      document.getElementById(fieldId).innerHTML = "";
      turn = "x";
      document.getElementById("now").innerHTML = "Tura x";
      numberTurn = true;
      field[fieldId] = null;
    }
  }
}
/*
function rowAndColumnValidation(isRowNotColumn) {
  let i0 = null, i1 = null, l = null, j = null, i = null,
      fieldSet = [];
  for (i = 0; columns > i; i++){
    for (j = 0; rows > j; j++){
      console.log(i, j)
      i0 = isRowNotColumn? i:j;
      i1 = isRowNotColumn? j:i;
      fieldSet = [ field[[i0, i1]], field[[i0, i1 + 1]], field[[i0, i1 + 2]] ];
      //console.log(i, j)
      if(fieldSet.every(x => x === true) || fieldSet.every(x => x === false)){
        for (l = 0; l < fieldSet.length; l++){
          field[[i0, i1 + l]] = null;
        }
        console.log(fieldSet[0], fieldSet[1], fieldSet[2])
        console.log('gg')
        return fieldSet[0];
      }else{

        break;
      }
    }
  }
} */

function rowAndColumnValidation(field0, field1){
  let fieldSet = [],
      i = 0,
      j = 0,
      x = [];

  for (; j < 2; j++) {
    if(j){
      x[1] = 0;
      x[3] = 0;
    }else{
      x[0] = 0
      x[2] = 0
    }

    for (; i < 3; i++) {
      x[0] = j? i-2:0;
      x[1] = j? 0:i-2;
      x[2] = j? i-1:0;
      x[3] = j? 0:i-1;

      fieldSet = [
        field[[field0 + x[0], field1 + x[1] ]],
        field[[field0 + x[2], field1 + x[3] ]],
        field[[field0, field1]] ]
      if(fieldSet.every(x => x === true) || fieldSet.every(x => x === false)){
        // zrób nullowanie ;)
        return fieldSet[2]
      }else{
        break;
      }
    }
  }
}